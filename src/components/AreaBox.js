import React from "react";
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
import Icon from 'react-native-vector-icons/Entypo';
import { icons, images, SIZES, COLORS } from '../constants'

export default function ({ item, onPress, mode}) {
    const { AreaImg , AreaName } = item;
    const width = Dimensions.get('window').width - 40
    return (
        
    <TouchableOpacity onPress={onPress}>
        <View style={{
            width: width / 2 - 10,
        }}>
            <View style={{
                backgroundColor: COLORS.white, 
                width: '100%',
                height: 180,
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 1,
            }}>
                <View style={{
                    width: "100%",
                    height: "80%",
                    alignItems: "center",
                    justifyContent: "center"

                }}>
                    <Image
                        source={AreaImg}
                        resizeMode="cover"
                        style={{
                            width: "87%",
                            height: "87%",
                            borderRadius: 10,
                        }}
                    />
                    {mode === 'DELETE' && (
                        <View style={{
                            width: 25,
                            height: 25, 
                            borderRadius: 60,
                            left: '83%',
                            bottom: '82%',
                            position: 'absolute',
                            backgroundColor: '#fd0e35',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Icon name="cross" style={{
                            fontSize: 20,
                            height: 22,
                            color: 'white',
                        }} />
                        </View>
                    )}
                    {mode === 'EDIT' && (
                        <View style={{
                            width: 25,
                            height: 25, 
                            borderRadius: 60,
                            left: '83%',
                            bottom: '82%',
                            position: 'absolute',
                            backgroundColor: "rgba(50, 115, 220, 0.8)",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Image source={icons.edit} style={{width: 20, height: 22, color: COLORS.white,}}/>
                        </View>
                    )}
                </View>
                <Text style={{
                    fontFamily: "Bold",
                    fontSize: 11,
                    textAlign: "center",
                }}>
                    {AreaName}
                    </Text>
            </View>
        </View>
    </TouchableOpacity>
        
    );
    
}