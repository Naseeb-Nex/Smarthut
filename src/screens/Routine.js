import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Dimensions,
} from "react-native";
import moment from 'moment';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database';
import Routinelayout from '../components/Routinelayout'

const Routine = ( {navigation} ) => {
    
  const [area, setarea] = useState();
  const [userid, setUserid] = useState('UK5H6UwCFcZPBf5SLKbw4DQCAIL2');

  React.useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              setUserid(user.uid); 
          }
      });
      

      const userRef = firebase.database().ref('users/' + userid + '/Routine');
      const OnLoadingListener = userRef.on('value', (snapshot) => {
        setarea([]);
        snapshot.forEach(function (childSnapshot) {
          setarea((area) => [...area, childSnapshot.val()]);
          console.log(area);
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

function renderHeader( navigation ) {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primary}}>
            <View style={{
            flex: 1,
            backgroundColor: COLORS.primary,
            paddingTop: '5%'
        }}>
                <View style={{ flexDirection: 'row', height: 50 }}>
                   <TouchableOpacity
                   onPress={() => navigation.navigate('Home', { name: 'Home' })}
                style={{
                    width: 50,
                    paddingLeft: SIZES.padding * 2,
                    justifyContent: 'center'
                }}

            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.white,
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
                    <Text style={{ fontFamily: 'Medium', color: 'white', fontSize: 20 }}>Routine</Text>
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
            </View>
            

        </View>
    )
}

function mainSwitch() {
    return (
        <View style={{
            flex: 7,
            backgroundColor: COLORS.lightGray4,
            borderTopLeftRadius: 60,
            borderTopRightRadius: 60,
            width: "100%",
            height: '100%',
            alignItems: "center",
           }}>
           <View style={{flex: 1}}>
            <ScrollView style={styles.scrollview}>
              <View style={styles.topcont}>
                <FlatList
                  data={area}
                  renderItem={({ item }) => (
                    <Routinelayout item={item} userid={userid}/>
                    )}
                  />
                </View>
              </ScrollView>
            </View>
                <TouchableOpacity activeOpacity={0.5} 
                      style={styles.TouchableOpacityStyle}
                      onPress={() => navigation.navigate('Edit', { name: 'Edit' })} 
                >
                    <Image source={icons.addbtn}  style={styles.FloatingButtonStyle} />
                </TouchableOpacity>
        </View>
    )
}
  
        return (
            <SafeAreaView style={styles.container}>
                {renderHeader( navigation )}
                {mainSwitch()}
            </SafeAreaView>
        
        );
    
};

export default Routine;

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
      scrollview: {
        flex: 1,
      },
      topcont: {
      marginTop: 22,
      width: '100%',
      height: '100%',
      alignItems: 'center',
    },
  
});
