import React , { useState, useEffect, useRef } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    FlatList,
    Modal,
    ScrollView,
} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import firebase from 'firebase/app';
import 'firebase/database';
import Button from '../components/Button'
import moment from 'moment';

export default function () {

    const first = `
#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>

// Set these to run example.
#define FIREBASE_HOST "smart-hut-b75b1-default-rtdb.firebaseio.com"  
#define FIREBASE_AUTH "y1zAE0z8DUMzuJUNiDO4mrGyqsSjmLHAaQ6aqU2S" 
#define WIFI_SSID "<--WIFI Name/SSID-->"
#define WIFI_PASSWORD "<--WIFI Password-->"

uint8_t LED = D5;
String <--Switch Name--> = "";  
uint8_t Red = D6;
uint8_t Green = D7;
uint8_t Blue = D8;

int r, g, b;

void setup() {
  Serial.begin(9600);

  pinMode(LED, OUTPUT);

  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);

}



void loop() {
  <--Switch Name--> = Firebase.getString("users/UK5H6UwCFcZPBf5SLKbw4DQCAIL2/areas/<--AreaName-->/switches/<--Switch Name-->/SwitchStatus/Status");                                      // get ld status input from firebase
  if (<--Switch Name--> == "ON") 
  {                                  
    Serial.println("Led Turned ON");                                                        
    digitalWrite(LED, LOW);                                              
  } 
  else if (<--Switch Name--> == "OFF") 
  {                                           
    Serial.println("Led Turned OFF");
    digitalWrite(LED, HIGH);                                        
  }
  else 
  {
    Serial.println("Command Error! Please send ON/OFF");
  }

  
  r = Firebase.getInt("users/UK5H6UwCFcZPBf5SLKbw4DQCAIL2/RGBlight/R");
  g = Firebase.getInt("users/UK5H6UwCFcZPBf5SLKbw4DQCAIL2/RGBlight/G");
  b = Firebase.getInt("users/UK5H6UwCFcZPBf5SLKbw4DQCAIL2/RGBlight/B");
  
  Serial.println(r);
  Serial.println(g);
  Serial.println(b);

  analogWrite(Red, r);
  analogWrite(Green, g);
  analogWrite(Blue, b);
}`  

    return (
        <View style={styles.container}>
                    <Text style={styles.text}>{first}</Text>
        </View>
    );
}

const width = Dimensions.get('window').width - 35;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    text: {
        fontFamily: 'code',

    }
   
})
