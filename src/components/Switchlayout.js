import React , { useState, useEffect } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import { Switch } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Entypo';
import firebase from 'firebase/app';
import 'firebase/database';

export default function ({item, AreaName, mode, userid, areaName, onPress}) {
    const { SwitchName, Switchicon} = item;
    const [switchval, setSwitchval] = React.useState(false)
    const [countH, setcountH] = React.useState();
    const [onoroff, setonoroff] = React.useState();
    const [cf, setcf] = React.useState(0);
    const width = Dimensions.get('window').width - 35
    const times = new Date().toLocaleString()
    console.log(item);

        function switchOn() {
        firebase
           .database().ref('users/' + userid + '/areas/' + areaName + '/switches/' + SwitchName + '/SwitchStatus')
           .set(
               {
                    Status: 'ON',
               }
           ).then(()=> {
               console.log("ON");
           }).catch((error)=> {
               console.log(error);
           });
           setcountH(prevcountH => prevcountH + 1)
           console.log(countH)
        firebase
           .database().ref('users/' + userid + '/log/' + countH )
           .set(
               {
                    switchName: SwitchName,
                    siwtchIcon: Switchicon,
                    status: 'ON',
                    logtimes : times
               }
           ).then(()=> {
           }).catch((error)=> {
               console.log(error);
           });
        
    }

    function switchOff() {
        firebase
           .database().ref('users/' + userid + '/areas/' + areaName + '/switches/' + SwitchName + '/SwitchStatus')
           .set(
               {
                    Status: 'OFF',
               }
           ).then(()=> {
               console.log("OFF");
           }).catch((error)=> {
               console.log(error);
           });

               setcf(prevcf => prevcf + 1)
           if (cf >= 1) {
               setcountH(prevcountH => prevcountH + 1)
               console.log(countH)
                firebase
                .database().ref('users/' + userid + '/log/' + countH )
                .set(
                    {
                            switchName: SwitchName,
                            siwtchIcon: Switchicon,
                            status: 'OFF',
                            logtimes : times
                    }
                ).then(()=> {
                }).catch((error)=> {
                    console.log(error);
                });
                
           }
    }

    React.useEffect(() => {
        const userRef = firebase.database().ref('users/' + userid + '/areas/' + areaName + '/switches/' + SwitchName + '/SwitchStatus');
        const OnLoadingListener = userRef.on('value', (snapshot) => {
            setonoroff([]);
            snapshot.forEach(function (childSnapshot) {
            setonoroff((onoroff) => [...onoroff, childSnapshot.val()]);
            console.log(onoroff);
            });
        });
        const childRemovedListener = userRef.on('child_removed', (snapshot) => {
            // Set Your Functioanlity Whatever you want.
            console.log('Child Removed');
        });

        const childChangedListener = userRef.on('child_changed', (snapshot) => {
            // Set Your Functioanlity Whatever you want.
            console.log('Child Updated/Changed');
        });

        if(item.SwitchStatus.Status === 'ON'){
            setSwitchval(true)
        }else{
            setSwitchval(false)
        }
        
        return () => {
            userRef.off('value', OnLoadingListener);
            userRef.off('child_removed', childRemovedListener);
            userRef.off('child_changed', childChangedListener);
        };

    }, []);

    useEffect(() => {
        const historys = firebase.database().ref('users/' + userid + '/log');
        const indexlistener = historys.on("value", (snapshot) =>{
            const a = snapshot.numChildren();
            setcountH(a)
        } )
        
        switchval ? switchOn() : switchOff();
    },[switchval])
    
    return (
        <TouchableOpacity
            style={{width: width / 2}}
            onPress={onPress}
            >
            <View style={{
                backgroundColor: COLORS.white ,
                width:   '90%' ,
                height: 130 ,
                borderRadius: 15 ,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 1,
            }}
            
            >
            {mode === 'DELETE' && (
                        <View style={{
                            width: 25,
                            height: 25, 
                            borderRadius: 60,
                            left: '80%',
                            bottom: '79%',
                            position: 'absolute',
                            backgroundColor: '#fd0e35',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Icon name="cross" style={{
                            fontSize: 20,
                            height: 22,
                            color: 'white',
                        }} />
                        </View>
                    )}
                    {mode === 'EDIT' && (
                        <View style={{
                            width: 25,
                            height: 25, 
                            borderRadius: 60,
                            left: '80%',
                            bottom: '79%',
                            position: 'absolute',
                            backgroundColor: "#0099CC",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Image source={icons.edit} style={{width: 20, height: 22, color: COLORS.white,}}/>
                        </View>
                    )}
                    <View style={{
                        paddingLeft: SIZES.padding * 2,
                        height: "100%",
                    }}>
                        <View style={{
                            width: "60%"
                        }}>
                            <View style={{
                                width: 60,
                                height: 60,
                                marginLeft: "2%",
                                marginTop: "2%"
                            }}>
                            <Image
                                source={Switchicon}
                                resizeModde= "contain"
                                style={{
                                    width: 40,
                                    height: 40,
                                    marginTop: "18%",
                                }}
                                />
                            </View>
                        </View>
                <TouchableOpacity>
                    <Text style={{
                        fontFamily: "Bold",
                        fontSize: 13,
                    }}>
                        {SwitchName}
                    </Text>
                    <Text style={{
                        fontFamily: "Light",
                        fontSize: 9,
                        color: COLORS.darkgray
                    }}>
                        {AreaName}
                    </Text>
                    <View style={{
                        width: 40,
                        height: 53,
                    }}>
                        <View 
                        style={{
                            borderWidth: 0.5,
                            borderColor: COLORS.lightGray,
                            backgroundColor: COLORS.white,
                            width: "100%",
                            height: "52%",
                            borderRadius: 15,
                            alignItems: "center",
                            marginLeft: "180%",
                            shadowColor: COLORS.lightGray2,
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: 6,
                            elevation: 1,
                        }}
                        >
                            <View styel={{
                                width: "80%"
                            }}
                            >
                                <Switch
                                    trackColor= {{ false: COLORS.white, true: COLORS.white }}
                                    thumbColor={switchval ? COLORS.primary : COLORS.lightGray3 }
                                    style={{ transform:[{ scaleX: .8 }, { scaleY: .8 }] }}
                                    value={switchval}
                                    onValueChange={(value) => setSwitchval(value)}
                                />
                            </View>
                        </View>

                    </View>
                    </TouchableOpacity>

                </View>
            </View>
        </TouchableOpacity>
    );
    
}