import React, { useState, useEffect, useContext } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    Modal,
    TextInput,
    AsyncStorage,
} from "react-native";
import 'react-native-gesture-handler';
import AreaBox from '../components/AreaBox'
import Wheatherfeild from '../components/wheatherfeild'
import ActionButton from 'react-native-action-button';
import Button from '../components/Button'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { icons, images, SIZES, COLORS } from '../constants'
import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database';
import * as Location from 'expo-location';

const Home = ({ route, navigation }) => {

    const [loadinguser, setLoadinguser] = React.useState(0);
    const [userid, setUserid] = React.useState('UK5H6UwCFcZPBf5SLKbw4DQCAIL2');
    const [area, setarea] = React.useState();
    const [mode, setMode] = React.useState('Default')
    const [showAlert, SetshowAlert] =  React.useState(false);
    const [Editalert, SetEditalert] =  React.useState(false);
    const [areaName, SetareaName] = React.useState('');
    const [areaImg, SetareaImg] = React.useState('');
    const[data, setData] = useState({});
    const [text, setText] = React.useState('');
    const [weref, setWeref] = React.useState();
    const [areaid, setAreaid] = useState();


    const Addarea = () => {
        navigation.navigate('AreaSelector', { user: userid})
    }

    const areaDmode = () => {
        setMode('DELETE')
    }; 

    const areaEdit = () => {
        setMode('EDIT')
    };

    const weatherrefresh = () => {
        setWeref(1);
    };

    const deleteArea = () => {
      firebase.database()
      .ref('users/' + userid + '/areas/' + areaName)
      .remove()
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
        console.log('removed office');
        SetshowAlert(false);
        setMode('default');
    }

    const editareaname = () => {
        deleteArea();
        firebase
        .database()
        .ref('users/' + userid + '/areas/' + text )
        .set({
        id: areaid,
        userId: userid,
        type: 'area',
        AreaName: text,
        AreaImg: areaImg,
        })
        .then(()=> {
            console.log('Uploaded');
            SetEditalert(false);
            setText('');
        })
        .catch((error) => {
            cosole.log('error !!',error)
            }
        )


    }
    
    const Navcontroller = (item) => {
        setAreaid(item.id);
        SetareaName(item.AreaName);
        SetareaImg(item.AreaImg);
        if( mode === 'DELETE'){
            SetshowAlert(true)
        }else if(mode === 'EDIT'){
            SetEditalert(true)
        }
        else{
            navigation.navigate('SwitchBox', { user: userid, areaname: item.AreaName})
        }
    };

    const cancelAlert = () => {
        SetshowAlert(false);
        setMode('OFF');
        SetEditalert(false);
    };



    const API_KEY = '986578faa8638ed75fd6a931c85c5a64'

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            const userinfo = user.uid;
            setUserid(user.uid);
            console.log();
            
        });
        const userRef = firebase.database().ref('users/' + userid + '/areas');
        const OnLoadingListener = userRef.on('value', (snapshot) => {
            setarea([]);
            snapshot.forEach(function (childSnapshot) {
                setarea((area) => [...area, childSnapshot.val()]);
                console.log(area)
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
        
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              fetchDataFromApi("40.7128", "-74.0060")
              return;
            }
        
            let location = await Location.getCurrentPositionAsync({});
            fetchDataFromApi(location.coords.latitude, location.coords.longitude);
          })();
        return () => {
            userRef.off('value', OnLoadingListener);
            userRef.off('child_removed', childRemovedListener);
      userRef.off('child_changed', childChangedListener);
    };
    }, []);



    const fetchDataFromApi = (latitude, longitude) => {
        if(latitude && longitude) {
          fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
    
          console.log(data)
          setData(data)
          })
        } else {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=$9.036774&lon=$76&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
    
          console.log(data)
          setData(data)
          })

        }
        
      }
   
    
    function renderHeader() {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
                <View style={{
                    flex: 1,
                    backgroundColor: COLORS.primary,
                    paddingTop: "5%"
                }}>
                    <View style={{ flexDirection: 'row', height: 50 }}>
                        <TouchableOpacity
                            style={{
                                width: 50,
                                paddingLeft: SIZES.padding * 2,
                                justifyContent: 'center'
                            }}
                            onPress={weatherrefresh}
                        >
                             <Image
                                source={icons.menu1}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30
                                }}
                            />   
                        </TouchableOpacity>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View
                                style={{
                                    width: '70%',
                                    height: "100%",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}

                            >
                                <Text style={{ fontSize: SIZES.h3, fontFamily: 'Medium', color: 'white' }}>Control Panel</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={{
                                width: 50,
                                paddingRight: SIZES.padding * 2,
                                justifyContent: 'center'
                            }}
                            onPress={() => navigation.navigate('Usersrc', { user: userid })}
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
                    <View>
                        <Wheatherfeild wheatherdata={data.current} navigation={navigation} data={data}/>
                    </View>
                </View>


            </View>
        )
    }

    function mainPart(navigation) {
        return (
            <View
             style={{
                flex: 3,
                backgroundColor: COLORS.lightGray4,
                borderTopLeftRadius: 60,
                borderTopRightRadius: 60,
                width: "100%",
            }}>
                <Modal
                    visible={showAlert}
                    transparent
                    onRequestClose={() => SetshowAlert(false) }
                >
                    <View  style={styles.maincontainer}>
                        <View style={styles.Alertbox}>
                            <View style={styles.AlertTittle}>
                                <Text style={styles.Alerttext}> Are you sure you want delete this area?</Text>
                            </View>
                            <View style={styles.Alertbottom}>
                                <View style={styles.Alertbutton1}>
                                    <Button  mode="outlined" onPress={cancelAlert} >
                                    Cancel
                                    </Button>
                                </View>
                                <View style={styles.Alertbutton2}>
                                    <Button  mode="outlined" onPress={deleteArea}>
                                    Ok
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={Editalert}
                    transparent
                    onRequestClose={() => SetEditalert(false) }
                >
                    <View  style={styles.maincontainer}>
                        <View style={styles.Alertbox2}>
                            <View style={styles.AlertTittle}>
                                <Text style={styles.EditTittle}>Edit AreaName</Text>
                                <Text style={styles.desctext}>You can change the areaname here</Text>
                            </View>
                            <View styles={styles.centerpart}>
                                <View style={styles.editinput}>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={text => setText(text)}
                                    value={text}
                                />
                                </View>
                            </View>
                            <View style={styles.Alertbottom}>
                                <View style={styles.Alertbutton1}>
                                    <Button  mode="outlined" onPress={cancelAlert} >
                                    Cancel
                                    </Button>
                                </View>
                                <View style={styles.Alertbutton2}>
                                    <Button  mode="outlined" onPress={editareaname}>
                                    Ok
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={styles.mainPart}>
                    <View style={styles.Areacontainer} >
                        <FlatList
                            data={area}
                            numColumns={2}
                            keyExtractor={item => item.id.toString()}
                            columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 15}}
                            renderItem={({ item }) => (
                                <AreaBox onPress={() => Navcontroller(item)} item={item} mode={mode} />
                            )}
                        />
                    </View>
                </View>
                <ActionButton buttonColor= '#6200EE' >

                    <ActionButton.Item
                    buttonColor="#fd0e35"
                    title="Delete"
                    onPress={areaDmode}
                    >
                    <Icon1 name="delete-outline" style={styles.actionButtonIcon} />
                    </ActionButton.Item>

                    <ActionButton.Item
                    buttonColor="#0ba6ff"
                    title="Edit Area"
                    onPress={areaEdit}
                    >
                    <Icon2 name="edit" style={styles.actionButtonIcon} />
                    </ActionButton.Item>

                    <ActionButton.Item
                    buttonColor="#1183ca"
                    title="Add Area"
                    onPress={Addarea}
                    >
                    <Icon3 name="ios-add" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
            </View>
        )

    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {mainPart(navigation)}
        </SafeAreaView>

    );
};
export default Home;

const width = Dimensions.get('window').width - 40

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        paddingTop: Platform.OS === 'android' ? 30 : 0
    },
    mainPart: {
        flex: 6,
        backgroundColor: COLORS.lightGray4,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        width: "100%",
    },
    toppadding: {
        height: '8%',
        width: '100%'
    },
    Areacontainer: {
        paddingTop: '10%',
        paddingHorizontal: 20, 
        flex: 1,
        zIndex: 1,
    },
    maincontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000066'
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
  FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  Alertbox: {
      width: width - 10,
      height: 150,
      borderRadius: 20,
      backgroundColor: COLORS.white,
  },
  AlertTittle: {
      margin: 5,
      paddingVertical: 20,
      paddingHorizontal: 10,
      alignItems: 'center'
  },
  Alerttext: {
      fontFamily: 'Medium',
      fontSize: 15,
  },
  Alertbottom: {
      flexDirection: 'row',
      alignItems: 'center'
  },
  Alertbutton1: {
      width: '50%',
      height: 50,
      paddingHorizontal: 10,
      alignItems: 'center'
  },
  Alertbutton2: {
      width: '50%',
      height: 50,
      paddingHorizontal: 10,
      alignItems: 'center'
  },
  Alertbox2: {
      width: width - 10,
      height: 260,
      borderRadius: 20,
      backgroundColor: COLORS.white,
  },
  AlertTittle2: {
      margin: 5,
      paddingVertical: 20,
      paddingHorizontal: 10,
      alignItems: 'center'
  },
  EditTittle: {
      fontSize: 20,
      fontFamily: 'Bold',

  },
  desctext: {
      fontSize: 10,
      fontFamily: 'Light',
      color: COLORS.lightGray3,
      alignItems: 'center',
  },
  centerpart: {
      height: 120, 
      alignItems: 'center',
      justifyContent: 'center',
  },
  editinput: {
      height: 50,
      paddingHorizontal: 30,
      marginBottom: 30,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: COLORS.primary,
    fontFamily: 'Medium',
    fontSize: 15,
  },
});
