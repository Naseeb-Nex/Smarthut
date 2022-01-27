import React, { useEffect, useState, useRef} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import { icons, images, SIZES, COLORS } from '../constants'
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database';
import Rarea from '../components/Rarea'



export default function Edit({ route, navigation }) {
    
  var timeh = moment().format('HH');
  var timem = moment().format('mm');

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, settext] = useState(timeh + ' : ' + timem);
  const [area, setarea] = useState();
  const [switches, setswitches] = useState();
  const [userid, setUserid] = useState('UK5H6UwCFcZPBf5SLKbw4DQCAIL2');
  const [areaName, SetareaName] = useState();
  const [showSw, SetshowSw] = useState('Hide');
  const [thour, setthour] = useState();
  const [tminute, settminute] = useState();
  const [tittles, settittles] = useState();
  const [desc, setdesc] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1);
    let fTime = tempDate.getHours() + " : " + tempDate.getMinutes();

    settext(fTime);
    setthour(tempDate.getHours());
    settminute(tempDate.getMinutes());
    
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const swselector = (item) => {
    SetareaName(item.AreaName);
    SetshowSw("Show");
  };



  React.useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              setUserid(user.uid); 
          }
      });
      

      const userRef = firebase.database().ref('users/' + userid + '/areas');
      const OnLoadingListener = userRef.on('value', (snapshot) => {
        setarea([]);
        snapshot.forEach(function (childSnapshot) {
          setarea((area) => [...area, childSnapshot.val()]);
          setswitches(area);
        });
      });
      const childRemovedListener = userRef.on('child_removed', (snapshot) => {
        // Set Your Functioanlity Whatever you want.
        console.log('Child Removed');
      });

      const childChangedListener = userRef.on('child_changed', (snapshot) => {
        // Set Your Functioanlity Whatever you want.
        console.log('Child Updated/Changed');
      });


      return () => {
        userRef.off('value', OnLoadingListener);
        userRef.off('child_removed', childRemovedListener);
        userRef.off('child_changed', childChangedListener);
      };
  }, []);


  function renderHeader( ) {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primary}}>
            <View style={{
            flex: 1,
            backgroundColor: COLORS.primary,
            paddingTop: '7%'
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

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View
                    style={{
                        width: '70%',
                        height: "100%",
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{ fontFamily: 'Medium', color: 'white', fontSize: 20 }}>Create Routine</Text>
                </View>
            </View>

                    <TouchableOpacity
                style={{
                    width: 50,
                    paddingRight: SIZES.padding * 2,
                    justifyContent: 'center'
                }}
                onPress={() => navigation.navigate('Usersrc', { user: userid })}
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


function mainlayout() {
    return (
        <View style={{
            flex: 6,
            backgroundColor: COLORS.lightGray4,
            borderTopLeftRadius: 60,
            borderTopRightRadius: 60,
           }}>
           <View style={{flex: 1}}>
           <ScrollView style={styles.scrollview}>
            <View style={styles.topcont}>
             <View style={styles.timebox}>
                <Text style={styles.pickertext}>Select time to shdeule</Text>
                <Text style={styles.clockText} onPress={showTimepicker}>{text}</Text>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
            </View>
            <Text style={styles.areahead1}>Routine Tittle</Text>
              <View style={styles.editinput}>
                 <TextInput
                    style={styles.textInput}
                    onChangeText={tittles => settittles(tittles)}
                    value={tittles}
                  />
              </View>
            <Text style={styles.areahead1}>Description</Text>
              <View style={styles.editinput}>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={desc => setdesc(desc)}
                    value={desc}
                  />
              </View>
            <Text style={styles.areahead}>Select Area</Text>
            <View style={styles.areacont}>
                <View style={styles.areabay}>
                  <FlatList
                      data={area}
                      horizontal={true}
                      renderItem={({ item }) => (
                        <View style={styles.containerr}>
                            <TouchableOpacity style={styles.touch} onPress={() => swselector(item)}>
                                <View style={[styles.cap]}>
                                    <Text style={[styles.title]}>{item.AreaName}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>  )}
                    />
              </View>
            </View>
            <View>
            {showSw === 'Show' && (
              <Rarea AreaName={areaName} navigation={navigation} userid={userid} text={text} thour={thour} tminute={tminute} tittles={tittles} desc={desc}/>
            )}
            </View>
          </ScrollView>
          </View>
        </View>
    )
  }
  return (
            <SafeAreaView style={styles.container}>
                {renderHeader()}
                {mainlayout()}
            </SafeAreaView>
        
        );
};

const width = Dimensions.get('window').width - 35

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        paddingTop: Platform.OS === 'android' ? 30 : 0
    },
    pickertext: {
      paddingTop: 10,
      fontSize: 20,
      fontFamily: 'Medium',
      color: COLORS.primary
    },
    clockText: {
    color: 'black',
    fontFamily: COLORS.Numberfont1,
    fontWeight: 'bold',
    fontSize: 70,
    },
    topcont: {
      marginTop: 22,
      width: '100%',
      height: 120,
      alignItems: 'center',
    },
    timebox: {
      width: 200,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerr: {
      width: width / 2 - 20,
      alignItems: 'center'
  },touch: {
    width: '80%',
    height: 50,
    alignItems: 'center'
},
cap: {
    width: '100%',
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary
},
title: {
    fontFamily: 'Medium',
    fontSize: 15,
    color: COLORS.white
},
areacont: {
  width: '100%',
  height: 100,
  alignItems: 'center',
  justifyContent: 'center',
},
areahead: {
  fontFamily: "Bold",
  fontSize: 20,
  color: COLORS.primary,
  paddingBottom: 10,
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
  width: '100%',
  height: 80,
  paddingLeft: 20,
  paddingRight: 20,
  alignItems: 'center',
  justifyContent: 'center',
},
editinput: {
    width: width,
      height: 50,
      paddingHorizontal: 30,
      marginBottom: 10,
  },
  scrollview: {
    flex: 1,
  },
    textInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: COLORS.primary,
    fontWeight: 'bold'
  },
    
});