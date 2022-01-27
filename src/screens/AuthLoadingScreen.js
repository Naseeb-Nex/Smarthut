import React from 'react';
import {View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase/app'
import { icons, SIZES, COLORS } from '../constants'

export default function AuthLoadingScreen({ navigation }) {

    React.useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is logged in
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        } else {
          // User is not logged in
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })
        }
      })
    }, [])
  
  return (
    <View style={styles.container} >
            <View>
                <Image
                    source={icons.Splashlogo}
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'cover'

                    }}
                />
            </View>
            <View>
                <Text style={styles.logoTexts}>SMART HUT</Text>
            </View>
      <ActivityIndicator
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: "75%",
                bottom: 0,
                alignItems: 'center',
              }}
              size="large"
              color= {COLORS.white}
            />
        </View>

  )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.loginbg,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoTexts: {
        color: COLORS.white,
        fontSize: 20,
        marginTop: 10,
        fontFamily: 'Bold',
        justifyContent: 'center'
    },
})
