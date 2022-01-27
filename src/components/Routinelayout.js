import React, { useEffect, useState, useRef} from 'react'
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
} from "react-native";
import 'react-native-gesture-handler';
import { icons, images, SIZES, COLORS } from '../constants'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import firebase from 'firebase/app';
import 'firebase/database';
import moment from 'moment';


export default function ({ item, userid,}) {
    const { title, identifier, desc, AreaName, SwitchName, sheduleTime } = item;
    
    const [countR, setcountR] = useState();
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const deleteru = async () => {
        await Notifications.cancelScheduledNotificationAsync(identifier);
        firebase.database()
            .ref('users/' + userid + '/Routine/' + identifier)
            .remove()
            .then(() => {
                console.log('routine deleted');
            })
            .catch((err) => {
                console.log(err);
            });
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
        <View style={styles.his}>
            <View style={styles.hisbox} >
                <View style={styles.flayer}>
                    <View style={styles.title1}>
                        <Text style={styles.titletext}>{title}</Text>
                        <Text style={styles.desctxt}>{desc}</Text>
                    </View>
                    <View style={styles.area}>
                        <Text style={styles.areatext}>{AreaName}</Text>
                        <Text style={styles.shedtext}>{sheduleTime}</Text>
                    </View>
                    <View style={styles.switch}>
                        <Text style={styles.swtext}>{SwitchName}</Text>
                        <TouchableOpacity style={styles.deletefeild} onPress={()=> deleteru()}>
                            <Icon name="delete-outline" style={styles.actionButtonIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
          </View>
        </View>    
    );
}

const width = Dimensions.get('window').width - 20
const styles = StyleSheet.create({
    his: {
    width: width,
    height: 100,
  },
  hisbox: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    width: '100%',
    height: 95,
    borderRadius: 15,
    shadowColor: "#000",
                shadowOffset: {
                    width: 1,
                    height: 3,
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
                elevation: 2,
  },
  flayer: {
      width: '100%',
      height: 95, 
      justifyContent: 'center',
      flexDirection: 'row',
  },
  title1: {
      width: "40%",
      height: 95,
      justifyContent: 'center',
      alignItems: 'center',
  },
  titletext: {
      fontFamily: 'Bold',
      fontSize: 15,
      color: COLORS.primary,
      paddingLeft: 5,
  },
  area: {
      width: "30%",
      height: 85,
      justifyContent: 'center',
      alignItems: 'center',
  },
  areatext: {
      fontFamily: 'Medium',
      fontSize: 15,
      color: COLORS.black,
      paddingLeft: 5,
  },
  switch: {
      width: "30%",
      height: 95,
      justifyContent: 'center',
      alignItems: 'center',
  },
  swtext: {
      fontFamily: 'Medium',
      fontSize: 15,
      color: '#A9A9A9',
      paddingLeft: 5,
  },
  desctxt: {
      fontFamily: 'Medium',
      fontSize: 12,
      color: '#C0C0C0',
      paddingLeft: 5,
      paddingTop: 5,
  },
  shedtext: {
      fontFamily: 'Light',
      fontSize: 14,
      color: '#228B22',
  },
  deletefeild: {
      width: 50,
      height: 50,
      alignItems: 'center', 
      justifyContent: 'center'
  },
  actionButtonIcon: {
    fontSize: 30,
    color: '#FF0000',
  },
});