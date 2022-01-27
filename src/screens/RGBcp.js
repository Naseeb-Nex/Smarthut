import React , { useState, Component } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Switch,
} from "react-native";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { ToggleButton } from 'react-native-paper';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import {
    SliderHuePicker,
    SliderSaturationPicker,
    SliderValuePicker
} from 'react-native-slider-color-picker';
import BackButton from '../components/BackButton'
import tinycolor from 'tinycolor2';
import firebase from 'firebase/app';
import 'firebase/database';


const RGBcp = ( {navigation} ) => {
    
function strpUpdate() {

    var strpcolor = oldColor;
    var a = strpcolor[1]+strpcolor[2];
    var b = strpcolor[3]+strpcolor[4]; 
    var c = strpcolor[5]+strpcolor[6]; 

    var r = parseInt(a, 16);
    var g = parseInt(b, 16);
    var b = parseInt(c, 16);

    console.log(r);
    console.log(g);
    console.log(b);

    if ( switchStatus === true ) {
            firebase
    .database()
    .ref('users/UK5H6UwCFcZPBf5SLKbw4DQCAIL2/RGBlight')
    .set({
        R : r,
        G : g,
        B : b
    })
    .then(()=> {
        console.log('Color Selected');
    })
    .catch((error) => {
        cosole.log('error !!',error)
        }
    )
    }
    else {
     firebase
    .database()
    .ref('users/UK5H6UwCFcZPBf5SLKbw4DQCAIL2/RGBlight')
    .set({
        R : 0,
        G : 0,
        B : 0
    })
    .then(()=> {
        console.log('RGB OFF');
    })
    .catch((error) => {
        cosole.log('error !!',error)
        }
    )   
    }

    
}


function renderHeader( navigation ) {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primary}}>
            <View style={{
            flex: 1,
            backgroundColor: COLORS.primary,
            paddingTop: '5%'
        }}>
                <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                   <BackButton goBack={() => navigation.goBack()}/>

                <View style={{ width: '80%',height: '100%',alignItems: 'center',left: '15%',  top: '9%' }}>
                <View
                    style={{
                        width: '70%',
                        height: '100%',
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ fontSize: 20, fontFamily: 'Medium', color: 'white' }}> RGB Control Pannel</Text>
                </View>
            </View>

                    <TouchableOpacity
                style={{
                    width: 50,
                    paddingRight: SIZES.padding * 2,
                    top: '5%'
                }}
                onPress={() => navigation.navigate('Usersrc')}
            >
                <Image
                    source={icons.user1}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30
                    }}
                />
            </TouchableOpacity>
                 </View>
            </View>
            

        </View>
    )
}

function mainSwitch() {
    const changeColor = (colorHsvOrRgb, resType) => {
        if (resType === 'end') {
            console.log(oldColor);
            setOldColor (
                tinycolor(colorHsvOrRgb).toHexString(),
            );
        }
        
    }
    
    return (
        <View style={{
            flex: 6,
            backgroundColor: COLORS.lightGray4,
            borderTopLeftRadius: 60,
            borderTopRightRadius: 60,
            width: "100%",
            alignItems: "center",
        }}>
            <View style={{
                marginTop: "10%",
                 flexDirection: "row",

               }}
               >
                   <View style={{
                       width: "50%",

                   }} 
                   >
                       <Text style={{
                           fontFamily: "Medium",
                           fontSize: 25,
                           paddingLeft: SIZES.padding2 * 3,
                           paddingTop: SIZES.padding2 * 2,

                       }}
                       >
                           Living Room    
                       </Text>

                       <Text  style={{
                           fontFamily: "Medium",
                           fontSize: 25,
                           paddingLeft: SIZES.padding2 * 4,
                       }}
                       >
                            RGB light
                       </Text>

                       <View style={{
                            width: 50,
                            height: 40,
                            paddingTop: SIZES.padding2,

                        }}>
                            <View 
                            style={{
                                borderWidth: 0.5,
                                backgroundColor: COLORS.lightGray4,
                                borderColor: COLORS.lightGray,
                                width: "100%",
                                height: "100%",
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
                                        trackColor= {{ false: COLORS.lightGray4 , true: COLORS.lightGray4 }}
                                        thumbColor={switchStatus ? COLORS.primary : COLORS.lightGray3 }
                                        style={{ transform:[{ scaleX: 1 }, { scaleY: 1 }] }}
                                        value={switchStatus}
                                        onValueChange={(value) => setswitchStatus(value)}
                                        />
                                </View>
                            </View>
                        </View>                       
                   </View>
                   <View style={{
                       width: "50%",
                       
                   }} 
                   >
                        <Image
                            source={icons.hrgb}
                            resizeMode="cover"
                            style={{
                                width: "100%",
                                height: "60%"
                            }}
                        />

                   </View>
               </View>
            <View style={{alignItems: "center", justifyContent: "center" , height: "5%", width: "100%"}}>
                <View style={{marginHorizontal: 24, marginTop: 20, height: 12, width: 250, alignItems: "center", justifyContent: "center"}}>
                    <SliderHuePicker
                        oldColor={oldColor}
                        trackStyle={[{ height: 12, width: 250 }]}
                        thumbStyle={styles.thumb}
                        useNativeDriver={true}
                        onColorChange={changeColor}
                        onValueChange={strpUpdate()}
                    />
                </View>
                <View style={{marginHorizontal: 24, marginTop: 20, height: 12, width: 250, alignItems: "center", justifyContent: "center"}}>
                    <SliderSaturationPicker
                        oldColor={oldColor}
                        trackStyle={[{ height: 12, width: 250}]}
                        thumbStyle={styles.thumb}
                        useNativeDriver={true}
                        onColorChange={changeColor}
                        style={{height: 12, borderRadius: 6, backgroundColor: tinycolor({h: tinycolor(oldColor).toHsv().h, s: 1, v: 1}).toHexString()}}
                    />
                </View>
                <View style={{marginHorizontal: 24, marginTop: 20, height: 12, width: 250, alignItems: "center", justifyContent: "center"}}>
                    <SliderValuePicker
                        oldColor={oldColor}
                        minimumValue={0.02}
                        step={0.05}
                        trackStyle={[{ height: 12, width: 250}]}
                        trackImage={require('react-native-slider-color-picker/brightness_mask.png')}
                        thumbStyle={styles.thumb}
                        onColorChange={changeColor}
                        style={{height: 12, borderRadius: 6, backgroundColor: 'black'}}
                    />
                </View>
                
            </View>
        </View>
    )
}

    const [oldColor, setOldColor] = useState('#FF7700')
    const [switchStatus, setswitchStatus] = React.useState(false)


        return (
            <SafeAreaView style={styles.container}>
                {renderHeader( navigation )}
                {mainSwitch()}
            </SafeAreaView>
        
        );
};

export default RGBcp;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        paddingTop: Platform.OS === 'android' ? 30 : 0
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    },
    thumb: {
        width: 20,
        height: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 0.35,
    },
  
});
