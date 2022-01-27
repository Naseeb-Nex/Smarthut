import React, { useRef, useState } from 'react';
import {View, Image, Text, StyleSheet, Animated, ActivityIndicator, AsyncStorage } from 'react-native';
import firebase from 'firebase/app'
import { icons, SIZES, COLORS } from '../constants'

const Splashsrc = ( {navigation} ) => {

    const LogoAnime = useRef(new Animated.Value(0)).current;
    const LogoText = useRef(new Animated.Value(0)).current;
    const [ loadingSpinner, setloadingSpinner] = React.useState(false);

    React.useEffect(() => {

        Animated.parallel([
      Animated.spring(LogoAnime, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 1000,
      }).start(),

      Animated.timing(LogoText, {
        toValue: 1,
        duration: 1200,
      }),
    ]).start(() => {
        setloadingSpinner(true);
      });

    }, [])

    setTimeout(() => {
        firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          AsyncStorage.setItem('user', user.uid); 
          console.log(user.uid) 
          // User is logged in
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home'}],
          })
        } else {
          // User is not logged in
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })
        }
      })
    }, 2600);


    return (
        <View style={styles.container} >
            <Animated.View
                style={{
                    opacity: LogoAnime,
                    top: LogoAnime.interpolate({
                        inputRange: [ 0, 1],
                        outputRange: [ 80, 0],
                    })
                }}
            >
                <Image
                    source={icons.Splashlogo}
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'cover'

                    }}
                />
            </Animated.View>
            
          {loadingSpinner ? (
            <ActivityIndicator
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '80%',
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              size="large"
              color= {COLORS.white}
            />
          ) : null}
            <Animated.View style={{ opacity: LogoText}}>
                <Text style={styles.logoTexts}>SMART HUT</Text>
            </Animated.View>
        </View>
    )
};

export default Splashsrc;

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