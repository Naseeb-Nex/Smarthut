import React from 'react'
import {View, ScrollView, Image, Text, StyleSheet} from 'react-native'
import moment from 'moment-timezone'
import FutureForecast from './FutureForecast'
import { icons, images, SIZES, COLORS } from '../constants'

const WeatherScroll = ({weatherData}) => {
    return (
        <ScrollView horizontal={true} style={styles.scrollView}>
            <CurrentTempEl data={weatherData && weatherData.length > 0 ? weatherData[0] : {}}/>
            <FutureForecast data={weatherData}/>
        </ScrollView>
    )
}

const CurrentTempEl = ({data}) => {

    if(data && data.weather){
        const img = {uri: 'http://openweathermap.org/img/wn/'+ data.weather[0].icon +'@4x.png'}
        return(
            <View style={styles.currentTempContainer}>
                <Image source={img} style={styles.image} />
                <View  style={styles.otherContainer}>
                    <Text  style={styles.day}>{moment(data.dt * 1000).format('dddd')}</Text>
                    <Text  style={styles.temp}>Night - {data.temp.night}&#176;C</Text>
                    <Text  style={styles.temp}>Day - {data.temp.day}&#176;C</Text>
                </View>
            </View>
        )
    }else{
        return( 
            <View>

            </View>

        )
        
    }
   
}

const styles = StyleSheet.create({
    scrollView: {
        flex:0.4,
        backgroundColor: COLORS.lightGray4,
        padding:30
    },
    image: {
        width: 100,
        height: 100
    },
    currentTempContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        justifyContent:"center",
        alignItems:'center',
        borderRadius: 10,
        borderColor:'#a2d5c6',
        borderWidth:3,
        padding: 15
    },
    day: {
        fontSize: 23,
        color: COLORS.white,
        fontFamily: 'Medium',
        padding: 10,
        textAlign:"center",
        marginBottom: 15
    },
    temp: {
        fontSize: 16,
        color: COLORS.white,
        textAlign:"center",
        fontFamily: 'Light'
    },
    otherContainer: {
        paddingRight: 40
    }
})

export default WeatherScroll
