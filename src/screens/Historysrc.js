import React , { useState } from "react";
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
} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import firebase from 'firebase/app';
import 'firebase/database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/Button'

const Historysrc = ( {route, navigation} ) => {

      const [userid, setuserid] = React.useState(route.params.user);
      const [historylog, sethistorylog] = React.useState();
      const [showAlert, SetshowAlert] = React.useState(false);

      const deletehistory = () => {
          firebase.database()
            .ref('users/' + userid + '/log')
            .remove()
            .then(() => {})
            .catch((err) => {
                console.log(err);
            });
        SetshowAlert(false);
      }

      const cancelAlert = () => {
        SetshowAlert(false);
    };

      const deletepopup = () => {
        SetshowAlert(true);
    };

    React.useEffect(() => {
        const userRef = firebase.database().ref('users/' + userid + '/log');
        const OnLoadingListener = userRef.on('value', (snapshot) => {
            sethistorylog([]);
            snapshot.forEach(function (childSnapshot) {
            sethistorylog((historylog) => [...historylog, childSnapshot.val()]);
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
                        <Text style={{ fontSize: 20, fontFamily: 'Medium', color: 'white' }}>Histroy Log</Text>
                    </View>
                </View>
                </View>
                <View style={styles.tools}>
                    <View style={styles.tool}>
                        <TouchableOpacity style={styles.addbtn} onPress={deletepopup}>
                            <Icon name="delete" style={styles.actionButtonIcon} />
                        </TouchableOpacity>
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
                alignItems: "center",
            }}>
                <Modal
                    visible={showAlert}
                    transparent
                    onRequestClose={() => SetshowAlert(false) }
                >
                    <View  style={styles.maincontainer}>
                        <View style={styles.Alertbox}>
                            <View style={styles.AlertTittle}>
                                <Text style={styles.Alerttext}> Are you sure you want delete all switch trigger log?</Text>
                            </View>
                            <View style={styles.Alertbottom}>
                                <View style={styles.Alertbutton1}>
                                    <Button  mode="outlined" onPress={cancelAlert} >
                                    Cancel
                                    </Button>
                                </View>
                                <View style={styles.Alertbutton2}>
                                    <Button  mode="outlined" onPress={deletehistory}>
                                    Ok
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <FlatList
                    data={historylog}
                    renderItem={({item}) => 
                    <View style={styles.his}>
                    <View style={styles.hisbox} >
                        <View style={styles.his1}>
                            <View style={{
                                width: 60,
                                height: 60,
                                marginLeft: "2%",
                                marginTop: "2%"
                            }}>
                            <Image
                                source={item.siwtchIcon}
                                resizeModde= "contain"
                                style={{
                                    width: 40,
                                    height: 40,
                                    marginTop: "18%",
                                }}
                                />
                            </View>
                </View>
            <View style={styles.his2}>
              <Text style={styles.histext}>{item.switchName}</Text>
                <Text style={styles.histext}>{item.status}</Text>
            </View>
            <View style={styles.his3}>
              <Text style={styles.histext}>{item.logtimes}</Text>
            </View>

          </View>
        </View>}
      />
            
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

export default Historysrc;

const width = Dimensions.get('window').width - 40


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
    },
    actionButtonIcon: {
    fontSize: 25,
    height: 24,
    color: 'white',
  },
  maincontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000066'
    },
  tools: {
        width: '100%',
        height: 50,
        alignItems: 'flex-end',
    },
    tool: {
        width: '20%',
        height: 50,
        flexDirection: 'row',
    },
    Alertbox: {
      width: width - 10,
      height: 165,
      borderRadius: 20,
      backgroundColor: COLORS.white,
  },
  AlertTittle: {
      margin: 5,
      paddingVertical: 20,
      paddingHorizontal: 10,
      alignItems: 'center'
  },
  Alerttext: {
      fontFamily: 'Medium',
      fontSize: 15,
  },
  Alertbottom: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  Alertbutton1: {
      width: '50%',
      height: 50,
      paddingHorizontal: 10,
      alignItems: 'center'
  },
  Alertbutton2: {
      width: '50%',
      height: 50,
      paddingHorizontal: 10,
      alignItems: 'center'
  },
  
  his: {
    paddingTop: 15,
    width: '100%',
    height: 80,
  },
  hisbox: {
    backgroundColor: COLORS.white,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    width: '95%',
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    shadowColor: "#000",
                shadowOffset: {
                    width: 1,
                    height: 3,
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
                elevation: 2,
  },
  his1: {
    width: "10%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  his2: {
    width: "40%",
    justifyContent: 'center',
  },
  histext: {
    fontFamily: 'Medium',
    fontSize: 15,
  },
  his3: {
    width: "40%",
    justifyContent: 'center',
  }
});
