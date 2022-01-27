import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState}from 'react';
import { SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Dimensions, } from 'react-native';
import * as Location from 'expo-location';
import { icons, images, SIZES, COLORS } from '../constants'
import DateTime from '../components/DateTime'
import WeatherScroll from '../components/WeatherScroll'

const API_KEY ='510fdf2e2a22a6d2555b9178a2f6ef14';
export default function Wheathersrc({navigation}) {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("40.7128", "-74.0060")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, [])

  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      // console.log(data)
      setData(data)
      })
    }
    
  }

  function renderHeader( navigation ) {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primary}}>
            <View style={{
            flex: 1,
            backgroundColor: COLORS.primary
        }}>
                <View style={{ flexDirection: 'row', height: 50, paddingTop: 60 }}>
                   <TouchableOpacity
                   onPress={() => navigation.navigate.goBack()}
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
                    <Text style={{ fontFamily: 'Medium', color: 'white', fontSize: 20 }}>Weather Info</Text>
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
            flex: 5,
            backgroundColor: COLORS.lightGray4,
            width: "100%",
            height: '100%',
            alignItems: "center",
           }}>
           <View style={{flex: 1}}>
            <ScrollView style={styles.scrollview}>
            <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
            <WeatherScroll weatherData={data.daily}/>
            </ScrollView>
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview:{
    flex:1, 
  }
});
