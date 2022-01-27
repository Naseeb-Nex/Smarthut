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
import Hardcode from '../components/Hardcode'

const Hardsrc = ( {navigation} ) => {

function renderHeader( navigation ) {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primary}}>
            <View style={{
            flex: 1,
            backgroundColor: COLORS.primary
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
                    <Text style={{ fontFamily: 'Medium', color: 'white', fontSize: 20 }}>Nodemcu code</Text>
                </View>
            </View>

                    <TouchableOpacity
                style={{
                    width: 50,
                    paddingRight: SIZES.padding * 2,
                    justifyContent: 'center'
                }}
            >
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
           <View style={{flex: 1,}}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={styles.areahead}>Source Code</Text>
                        <View style={styles.areacont}>
                            <View style={styles.areabay}>
                            <ScrollView style={styles.scrollview}>
                                <View>
                                    <Hardcode />
                                </View>
                            </ScrollView>
                        </View>
                        </View>
                </View>
            </View>
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

export default Hardsrc;

const width = Dimensions.get('window').width - 35;
const height = Dimensions.get('window').height - 35;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        paddingTop: Platform.OS === 'android' ? 30 : 0
    },
areacont: {
  width: '100%',
  height: height-150,
  alignItems: 'center',
  justifyContent: 'center',
},
areahead: {
  fontFamily: "Bold",
  fontSize: 20,
  color: COLORS.primary,
  paddingBottom: 10,
  paddingTop: 20,
  paddingLeft: 20
},
areahead1: {
  fontFamily: "Bold",
  fontSize: 20,
  color: COLORS.primary,
  paddingBottom: 10,
  paddingLeft: 20,
},
areabay: {
  width: '95%',
  height: '100%',
  borderColor: COLORS.primary,
  borderWidth: 3,
  borderRadius: 30,
  paddingLeft: 20,
  paddingRight: 20,
  paddingBottom: 20,
  alignItems: 'center',
  justifyContent: 'center',
},
  
});
