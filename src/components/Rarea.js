import React , { useState, useEffect, useRef } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    FlatList,
    Modal,
} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import firebase from 'firebase/app';
import 'firebase/database';
import Button from '../components/Button'
import moment from 'moment';

export default function ({ navigation, AreaName, userid, text, tminute, thour, tittles, desc}) {

    Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    const [area, setarea] = useState();
    const [selectedSw, setselectedSw] = useState();
    const [animation, setanimation] = useState(false);
    const [showswitches, Setshowswitches] = useState('Hide');
    const [shedalert, Setshedalert] = useState(false);
    const [trigg, Settrigg] = useState();
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [ident, setident] = useState('0');


    var timeh = moment().format('HH');
    var timem = moment().format('mm');
    

    const switchselector = (item) => {
        setselectedSw(item.SwitchName);
        Setshowswitches("Show");
    }

    const shedbtn = () => {
        Setshedalert(true);
    }

    const cancelAlert = () => {
        Setshedalert(false);
    }

    const updateshed = () => {
        if(thour>=timeh){
            if(tminute>timem){
                var a = thour - timeh;
                var b = tminute - timem;
                var times = 0;
                if(0<a){
                    times = a * 60 * 60;
                }
                if(0<b){
                    times = times + (b * 60);
                }
                if(times<0){
                    Setshedalert(false);
                }else{
                    var n = schedulePushNotification(times);

                    firebase
                    .database().ref('users/' + userid + '/Routine/' + ident  )
                    .set(
                        {
                                identifier: ident,
                                title: tittles,
                                desc: desc,
                                AreaName: AreaName,
                                SwitchName: selectedSw,
                                sheduleTime: text,
                                Hour: thour,
                                Minute: tminute,
                        }
                    ).then(()=> {
                        console.log("Routine uploaded");
                        navigation.navigate('Routine')
                    }).catch((error)=> {
                        console.log(error);
                    });
                }
            }
        }

        Setshedalert(false);
    }

    async function schedulePushNotification(t) {
    const identifier = await Notifications.scheduleNotificationAsync({
        content: {
        title: tittles,
        body: desc,
        },
        trigger: { seconds: t },
    });

    setident(identifier);

    }
    
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        });

        return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
        };
    },[])

    React.useEffect(() => {
        const userRef = firebase.database().ref('users/' + userid + '/areas/' + AreaName + '/switches');
        const OnLoadingListener = userRef.on('value', (snapshot) => {
            setarea([]);
            snapshot.forEach(function (childSnapshot) {
            setarea((area) => [...area, childSnapshot.val()]);
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
        
        return () => {
            userRef.off('value', OnLoadingListener);
            userRef.off('child_removed', childRemovedListener);
            userRef.off('child_changed', childChangedListener);
        };

    }, [AreaName]);

    async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }


    return (
        <View style={styles.container}>
          <View style={styles.reacont}>
                <Text style={styles.areahead}>Select Switch From {AreaName}</Text>
                <View style={styles.areabay}>
                  <FlatList
                          data={area}
                          horizontal={true}
                          renderItem={({ item }) => (
                            <View style={styles.containerr}>
                            <TouchableOpacity style={styles.touch} onPress={() => switchselector(item)}>
                                <View style={styles.cap}>
                                    <Text style={[styles.title]}>{item.SwitchName}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                  />
                </View>
                <View style={{width: '100%', height: 40,}}></View>
              </View>
              {showswitches === 'Show' && (
              <View style={styles.shedcont}>
                <TouchableOpacity style={styles.shedbox} onPress={shedbtn}>
                    <Text style={styles.shedtext}>Shedule</Text>
                </TouchableOpacity>
                <View style={{width: '100%', height: 50}}></View>
              </View>
            )}
            <Modal
                    visible={shedalert}
                    transparent
                    onRequestClose={() => Setshedalert(false) }
                >
                    <View  style={styles.maincontainer}>
                        <View style={styles.Alertbox}>
                            <View style={styles.AlertTittle}>
                                <Text style={styles.Alerttext}> Do you want to sehdule </Text>
                                <Text style={styles.Alerttext}> {selectedSw} to {text}?  </Text>
                            </View>
                            <View style={styles.Alertbottom}>
                                <View style={styles.Alertbutton1}>
                                    <Button  mode="outlined" onPress={cancelAlert} >
                                    Cancel
                                    </Button>
                                </View>
                                <View style={styles.Alertbutton2}>
                                    <Button  mode="outlined" onPress={() =>updateshed()}>
                                    Ok
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            
        </View>
    );
}

const width = Dimensions.get('window').width - 35

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerr: {
        paddingTop: 12,
        width: width / 2 - 20,
        alignItems: 'center'
    },
    reacont: {
        width: width,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
      },
      areahead: {
        fontFamily: "Medium",
        fontSize: 20,
        color: COLORS.primary,
      },
      areabay: {
        width: '100%',
        height: 80,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
    touch: {
        width: '80%',
        height: 50,
        alignItems: 'center'
    },
    cap: {
        width: '100%',
        height: 50,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white, 
        borderColor: COLORS.primary,
        borderWidth: 2,
    },
    title: {
        fontFamily: 'Medium',
        fontSize: 15,
        color: COLORS.primary,
    },
    shedcont: {
        width: width,
        height: 80,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    shedbox: {
        width: 200,
        height: 60,
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shedtext: {
        fontFamily: 'Bold',
        fontSize: 15,
        color: COLORS.white,
    },
     maincontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000066'
    },
  Alertbox: {
      width: width - 10,
      height: 175,
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
})
