import React, { useState} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { icons, images, SIZES, COLORS } from '../constants'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import firebase from 'firebase/app';
import 'firebase/auth'
import NetInfo from '@react-native-community/netinfo'
import BackButton from '../components/BackButton'
import { logoutUser } from '../api/auth-api'

export default function Usersrc({ route, navigation }) {

  const [fill, setfill] = React.useState(100);
  const [userid, setuserid] = React.useState('UK5H6UwCFcZPBf5SLKbw4DQCAIL2');
  const [userName, setuserName] = React.useState();
  const [networktype, setnetworktype] = React.useState();
  const [counterval, setcounterval] = React.useState(); 

  const logpress = () => {
    let a = logoutUser();
    navigation.navigate("LoginScreen");
  }

  React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setuserName(user.displayName); 
                console.log(userName)
            }
        });
  const unsubscribe = NetInfo.addEventListener(state => {
      setnetworktype(state.type);
      if (state.isConnected === true ){
        console.log("connected");
      }
      else {
        setfill(0)
      }
  });

  const userRef = firebase.database().ref('users/' + userid + '/log/counter');
    const OnLoadingListener = userRef.on('value', (snapshot) => {
      setcounterval([]);
      snapshot.forEach(function (childSnapshot) {
        setcounterval((counterval) => [...counterval, childSnapshot.val()]);
        console.log(counterval)
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

  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center',}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.topcontainer}>
        <View style={styles.backbtn}>
          <BackButton goBack={ () => navigation.goBack()}/>
        </View>
          <Image
            style={styles.userImg}
            source={icons.user1}
          />
          <Text style={styles.userName}>{userName || 'User'}</Text>
        </View>
        <View style={styles.maincontainer}>
          <View style={styles.firstrow}>
            <View style={styles.progressbar}>
              <AnimatedCircularProgress
                size={120}
                width={15}
                backgroundWidth={5}
                fill={fill}
                tintColor="#ff0000"
                tintColorSecondary="#00ff00"
                backgroundColor="#3d5875"
                arcSweepAngle={240}
                rotation={240}
                lineCap="round"
              >
              {
                (fill) => (
                      <Text style={{ fontFamily: 'Numberfont1',fontWeight: 'bold', color: '#5e5e5e'}}>
                        {100 || fill}%
                      </Text>
                    )
              }
              </AnimatedCircularProgress>
              <Text style={styles.performance}>Performance</Text>
            </View>
          </View>
        <View style={styles.his}>
         <TouchableOpacity onPress={() => navigation.navigate('Hardsrc', { user: userid })}>
          <View style={styles.hisbox1} >
            <View style={styles.his1}>
              <Icon1 name="codesquare" style={styles.actionButtonIcon} />
            </View>
            <View style={styles.his2}>
              <Text style={styles.histext}>Nodemcu Code</Text>
            </View>
          </View>
          </TouchableOpacity>
         <TouchableOpacity onPress={() => navigation.navigate('Historysrc', { user: userid })}>
          <View style={styles.hisbox} >
            <View style={styles.his1}>
              <Icon name="history" style={styles.actionButtonIcon} />
            </View>
            <View style={styles.his2}>
              <Text style={styles.histext}>Switch Log</Text>
            </View>
          </View>
          </TouchableOpacity>
        </View>
          <View style={styles.lg}>
            <View style={styles.lgbox} onPress={logoutUser}>
              <Text style={{color: COLORS.white, fontFamily: 'Medium', fontSize: 16}} onPress={logpress}>Log Out</Text>
            </View>
          </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
	container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  topcontainer: {
    flex: 3,
    width: '100%',
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    alignItems: 'center',
    paddingTop: '15%',
  },
  backbtn: {
    width: '100%',
    bottom: '25%'
  },
  userImg: {
    height: 80,
    width: 80,
    borderRadius: 75,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Medium',
    color: COLORS.white,
    marginTop: 10,
    marginBottom: 10,
    marginBottom: 30,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  maincontainer: {
    paddingTop: 30,
    width: '100%',
    flex: 6,
  },
  firstrow: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressbar: {
    width: '50%', 
    alignItems: 'center',
  },
  performance: {
    fontFamily: 'Bold',
    fontSize: 13,
    color: '#5e5e5e',
    paddingLeft: '5%'
  }, 
  his: {
    paddingTop: 15,
    width: '100%',
    height: 200,
  },
  hisbox: {
    backgroundColor: COLORS.white,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    width: '95%',
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    shadowColor: "#000",
                shadowOffset: {
                    width: 1,
                    height: 3,
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
                elevation: 2,
  },
  actionButtonIcon: {
    fontSize: 25,
    height: 25,
  },
  hisbox1: {
    backgroundColor: COLORS.white,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'row',
    width: '95%',
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    shadowColor: "#000",
                shadowOffset: {
                    width: 1,
                    height: 3,
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
                elevation: 2,
  },
  actionButtonIcon: {
    fontSize: 25,
    height: 25,
  },
  actionButtonIcon2: {
    fontSize: 25,
    height: 25,
    color: '#14C0CC',
  },
  his1: {
    width: "25%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  his2: {
    width: "70%",
    justifyContent: 'center',
  },
  histext: {
    fontFamily: 'Medium',
    fontSize: 15,
  },
  lg: {
    width: '100%',
    height: 80,
    alignItems: 'center',
  },
  lgbox: {
    width: 120,
    height: 60,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }, 

})