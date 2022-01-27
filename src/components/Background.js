import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, View } from 'react-native'
import { COLORS }  from  '../constants'

export default function Background({ children }) {
  return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        
          <View style={styles.top}></View>
          <View style={styles.middle}>
              {children}
          </View>
          <View style={styles.bottom}></View>
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.loginbg ,
    flex: 1
  },
  top: {
    position: 'relative',
    backgroundColor: COLORS.loginbg ,
    paddingRight: 12.7,
    paddingLeft: 12.7,
    height: 250,
  },
  middle: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'transparent',
    paddingLeft: 26.3,
    paddingRight: 26.3,
    alignItems: 'center'
  },
  quote: {
    color: COLORS.white,
    fontFamily: 'Medium',
    fontSize: 24,
    top: '11%',
    paddingVertical :'5%',
    alignSelf: 'center',
  },
  bottom: {
    position: 'relative',
    height: '100%',
    paddingRight: 12.7,
    paddingLeft: 12.7,
    backgroundColor: COLORS.loginbg ,
  },
  textContainer: {
    color: COLORS.primary,
    fontFamily: 'Bold',
    fontSize: 24,
    paddingVertical :'5%',
    alignSelf: 'center',
  },
})
