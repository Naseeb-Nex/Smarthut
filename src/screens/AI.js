import React , { useState, useEffect } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    Dimensions,
    FlatList,
    TextInput,
    ActivityIndicator, 
    PermissionsAndroid,
    TouchableHighlight,
ScrollView,
Platform
} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import Voice from '@react-native-community/voice';
import * as Permissions from 'expo-permissions';

const AI = ( {route, navigation} ) => {

    function renderHeader( navigation ) {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.primary}}>
                <View style={{
                flex: 1,
                backgroundColor: COLORS.primary
            }}>
                    <View style={{ flexDirection: 'row', height: 50 }}>
                    <TouchableOpacity
                    onPress={() => navigation.goBack()}
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

                    <View
                        style={{
                            width: '80%',
                            height: "100%",
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 20, fontFamily: 'Medium', color: 'white' }}>Voice Assistent</Text>
                    </View>
                </View>
                </View>
            </View>
        )
    }

    function mainSwitch(  navigation ) {
        return (
            <View style={{
                flex: 5,
                backgroundColor: COLORS.lightGray4,
                borderTopLeftRadius: 60,
                borderTopRightRadius: 60,
                width: "100%",
                height: '100%',

            }}>
            </View>
        )
    }

    
        return (
            <SafeAreaView style={styles.container}>
                {renderHeader( navigation )}
                {mainSwitch( navigation )}
            </SafeAreaView>
        
        );
};

export default AI;

const width = Dimensions.get('window').width - 40


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        paddingTop: Platform.OS === 'android' ? 30 : 0
    },
});
