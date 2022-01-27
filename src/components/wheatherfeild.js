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
import { icons, images, SIZES, COLORS } from '../constants'

export default function ({wheatherdata, navigation}) {
    if(wheatherdata && wheatherdata.weather){
        const img = {uri: 'http://openweathermap.org/img/wn/'+ wheatherdata.weather[0].icon +'@4x.png'};
        return(
            <View style={styles.container} >
            <View style={styles.temp}>
                <Text style={styles.wtext}>{wheatherdata.temp}</Text>
                <Text style={styles.wnote}>Temperature</Text>
            </View>
            <TouchableOpacity style={styles.wheather} onPress={() => navigation.navigate('Wheathersrc')}>
                <Image
                        source={img}
                        resizeMode= "contain"
                        style={styles.img}
                    />
            </TouchableOpacity>
            <View style={styles.hum}>
                <Text style={styles.wtext}>{wheatherdata.humidity}</Text>
                <Text style={styles.wnote}>Humidity</Text>
            </View>
        </View>            
        )
    }else{
        const dummy = {uri: 'http://openweathermap.org/img/wn/02d@4x.png'};
        return( 
            <View style={styles.container}>
            <View style={styles.temp}>
                <Text style={styles.wtext}>27.57</Text>
                <Text style={styles.wnote}>Temperature</Text>
            </View>
            <TouchableOpacity style={styles.wheather} onPress={() => navigation.navigate('Wheathersrc')}>
                <Image
                        source={dummy}
                        resizeMode= "contain"
                        style={styles.img}
                    />
            </TouchableOpacity>
            <View style={styles.hum}>
                <Text style={styles.wtext}>87</Text>
                <Text style={styles.wnote}>Humidity</Text>
            </View>
        </View>               

        )
        
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        width: '100%',
        height: '75%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    temp: {
        width: '35%',
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wheather: {
        width: '30%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: 100,
        height: 100,
    },
    hum: {
        width: '35%',
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wtext: {
        fontFamily: 'Numberfont1',
        fontSize: 30,
        color: COLORS.white,
    },
    wnote: {
        fontFamily: 'Medium',
        fontSize: 15,
        color: COLORS.white,
        marginTop: 5,
    },
});