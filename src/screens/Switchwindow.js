import React , { useState, useEffect } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import { Switch } from "react-native-gesture-handler";

function renderHeader(  navigation ) {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primary}}>
            <View style={{
            flex: 1,
            backgroundColor: COLORS.primary
        }}>
                <View style={{ flexDirection: 'row', height: 50 }}>
                   <TouchableOpacity
                   onPress={() => navigation.navigate('SwitchBox', { name: 'SwitchBox' })}
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
                </View>
            </View>

                    <TouchableOpacity
                style={{
                    width: 50,
                    paddingRight: SIZES.padding * 2,
                    justifyContent: 'center'
                }}
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

function initialval(navigation, setSwitch) {
    var light  = navigation.params.light;
    console.log(light);
    
}


function mainSwitch( isSwitchEnable, setSwitch ) {
    
    
    return (
        <View style={{
            flex: 7.5,
            backgroundColor: COLORS.lightGray4,
            borderTopLeftRadius: 60,
            borderTopRightRadius: 60,
            width: "100%",
            alignItems: "center",
           }}>
               <View style={{
                   flexDirection: "row",

               }}
               >
                   <View style={{
                       width: "50%",

                   }} 
                   >
                       <Text style={{
                           fontFamily: "Medium",
                           fontSize: 25,
                           paddingLeft: SIZES.padding2 * 3,
                           paddingTop: SIZES.padding2 * 2,

                       }}
                       >
                           Living Room    
                       </Text>

                       <Text  style={{
                           fontFamily: "Medium",
                           fontSize: 25,
                           paddingLeft: SIZES.padding2 * 3,
                       }}
                       >
                           Lighting
                       </Text>

                       <View style={{
                            width: 45,
                            height: 40,
                            paddingTop: SIZES.padding2,

                        }}>
                            <View 
                            style={{
                                borderWidth: 0.5,
                                borderColor: COLORS.lightGray,
                                backgroundColor: COLORS.white,
                                width: "100%",
                                height: "100%",
                                borderRadius: 15,
                                alignItems: "center",
                                marginLeft: "180%",
                                shadowColor: COLORS.lightGray4,
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.3,
                                shadowRadius: 6,
                                elevation: 1,
                            }}
                            >
                                <View styel={{
                                    width: "80%"
                                }}
                                >
                                    <Switch
                                        trackColor= {{ false: COLORS.white , true: COLORS.white }}
                                        thumbColor={isSwitchEnable ? COLORS.primary : COLORS.lightGray3}
                                        style={{ transform:[{ scaleX: .8 }, { scaleY: .8 }] }}
                                        value={isSwitchEnable}
                                        onValueChange={(value) => setSwitch(value)}
                                        />
                                </View>
                            </View>
                        </View>                       
                   </View>
                   <View style={{
                       width: "50%",
                       
                   }} 
                   >
                        <Image
                            source={icons.hlight}
                            resizeMode="cover"
                            style={{
                                width: "100%",
                                height: "60%"
                            }}
                        />
                   </View>
               </View>
        </View>
    )
}




const Switchwindow = ( { route, navigation } ) => {

    const [isSwitchEnable, setSwitch] = React.useState(false)

    React.useEffect(() => {
        let light  = route.params.light;
        console.log(light);
        
        setSwitch(light)

    }, [])
    


        return (
            <SafeAreaView style={styles.container}>
                {renderHeader( navigation )}
                {initialval(route,setSwitch)}
                {mainSwitch( isSwitchEnable, setSwitch)}
            </SafeAreaView>
        
        );
};

export default Switchwindow;

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
    }
  
});
