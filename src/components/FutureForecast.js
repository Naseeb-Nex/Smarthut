import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import moment from 'moment-timezone'
import { icons, images, SIZES, COLORS } from '../constants'

const FutureForecast = ({data}) => {
    return (
        <View style={{flexDirection: 'row'}}>

            {
                data && data.length > 0 ? 

                data.map((data, idx) => (

                    idx !== 0 &&  <FutureForecastItem key={idx} forecastItem={data}/>
                ))

                :

                <View/>
            }
          
            

        </View>
    )
}

const FutureForecastItem = ({forecastItem}) => {
    const img = {uri: "http://openweathermap.org/img/wn/"+forecastItem.weather[0].icon+"@2x.png"}
    return (
        <View  style={styles.futureForecastItemContainer}>
            <Text  style={styles.day}>{moment(forecastItem.dt * 1000).format('ddd')}</Text>
            <Image source={img} style={styles.image} />
            <Text  style={styles.temp}>Night - {forecastItem.temp.night}&#176;C</Text>
            <Text  style={styles.temp}>Day - {forecastItem.temp.day}&#176;C</Text>

        </View>
    )
}

export default FutureForecast


const styles = StyleSheet.create({
    image: {
        width: 80,
        height:80
    }, 
    futureForecastItemContainer: {
        flex:1,
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderRadius:10,
        borderColor: "#d72631",
        borderWidth:1,
        padding: 20,
        marginLeft: 10
    }, 
    day: {
        fontSize: 23,
        color: COLORS.white,
        padding: 10,
        textAlign:"center",
        marginBottom: 10,
        fontFamily: 'Medium',
    },   
    temp: {
        fontSize: 14,
        color:"white",
        fontFamily: 'Light',
        textAlign:"center"
    },
})