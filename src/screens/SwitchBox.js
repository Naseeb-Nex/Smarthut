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
    TextInput,
} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import { Switch } from "react-native-gesture-handler";
import firebase from 'firebase/app';
import 'firebase/database';
import Switchlayout from '../components/Switchlayout'
import Switchcap from '../components/Switchcap'
import ActionButton from 'react-native-action-button';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button'
import { FAB, Portal, Provider } from 'react-native-paper';

const switches = [
{
    id: 1,
    switchName: 'Main Light',
    switchicon: icons.light,
  },
  {
    id: 2,
    switchName: 'Fan',
    switchicon: icons.fan,
  }, 
  {
      id: 4,
      switchName: 'Desk Lamp',
      switchicon: icons.desklamp
  },
  {
      id: 5,
      switchName: 'Table Lamp',
      switchicon: icons.tablelamp
  },
  {
      id: 6,
      switchName: 'FLoor Lamp',
      switchicon: icons.floorlamp
  },
  {
      id: 7,
      switchName: 'Tv',
      switchicon: icons.tv,
  },
  {
    id: 8,
    switchName: 'main light2',
    switchicon: icons.light,
  },
  {
    id: 9,
    switchName: 'Temputure Sensor',
    switchicon: icons.light,
  },
];

const SwitchBox = ( {route, navigation} ) => {

    const [mode, setMode] = React.useState('Default')
    const [showAlert, SetshowAlert] =  React.useState(false);
    const [Editalert, SetEditalert] =  React.useState(false);
    const [areaName, SetareaName] = React.useState(route.params.areaname);
    const [userid, setUserid] = React.useState(route.params.user);
    const [addswitch, setAddswitch] = React.useState(false);
    const [switchName, setSwitchName] = React.useState();
    const [switchicon, setSwichicon] = React.useState();
    const [addconfirm, setaddconfirm] = React.useState(false);
    const [switchdwn, setSwitchdwn] = React.useState();
    const [area, setarea] = React.useState();
    const [text, setText] = React.useState();
    const [state, setState] = React.useState({ open: false });
    


    const onStateChange = ({ open }) => setState({ open });
    const { open } = state;

    const Addswh = () => {
        setAddswitch(true)
    }

    const areaDmode = () => {
        setMode('DELETE')
    }; 

    const editmode = () => {
        setMode('EDIT')
    }; 
    
    const cancelAlert = () => {
        SetshowAlert(false);
        setAddswitch(false);
        setaddconfirm(false);
        setMode("default");
    };

    const Navcontroller = box => {
        setSwitchName(box.SwitchName)
        if( mode === 'DELETE'){
            SetshowAlert(true)
        }else if(mode === 'EDIT'){
            SetEditalert(true)
        }
    };

    const editswitchname = () => {
        deleteswitch();
        firebase
        .database()
        .ref('users/' + userid + '/areas/' + areaName + '/switches/' + text )
        .set({
        SwitchName: text,
        Switchicon: switchicon,
        })
        .then(()=> {
            console.log('Uploaded');
            SetEditalert(false);
            setText('');
        })
        .catch((error) => {
            cosole.log('error !!',error)
            }
        )
    }


    const deleteswitch = () => {
    firebase.database()
      .ref('users/' + userid + '/areas/' + areaName + '/switches/' + switchName)
      .remove()
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
        console.log('removed');
        SetshowAlert(false);
    setMode('OFF')
    }

    const confirm = swtch => {
        setSwitchName(swtch.switchName);
        setSwichicon(swtch.switchicon);
        setaddconfirm(true);
    }
    
    const uploadSwitch = () => {
        firebase
    .database()
    .ref('users/' + userid + '/areas/' + areaName + '/switches/' + switchName )
    .set({
      SwitchName: switchName,
      Switchicon: switchicon,
    })
    .then(()=> {
        console.log('Uploaded switch');
        setaddconfirm(false);
        setAddswitch(false);
    })
    .catch((error) => {
        cosole.log('error !!',error)
        }
    )

    firebase
           .database().ref('users/' + userid + '/areas/' + areaName + '/switches/' + switchName + '/SwitchStatus')
           .set(
               {
                    Status: 'OFF',
               }
           ).then(()=> {
               console.log("OFF");
           }).catch((error)=> {
               console.log(error);
           });
    }

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            const userinfo = user.uid;
            setUserid(user.uid);
            console.log(user.uid);
        });
        const userRef = firebase.database().ref('users/' + userid + '/areas/' + areaName + '/switches');
        const OnLoadingListener = userRef.on('value', (snapshot) => {
            setarea([]);
            snapshot.forEach(function (childSnapshot) {
            setarea((area) => [...area, childSnapshot.val()]);
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
                backgroundColor: COLORS.primary,
                paddingTop: "5%"
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
                        <Text style={{ fontSize: 20, fontFamily: 'Medium', color: 'white' }}>{areaName}</Text>
                    </View>
                </View>

                        <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={()=> navigation.navigate('Usersrc',{ user: userid})}
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
                {/* <View style={styles.tools}>
                    <View style={styles.tool}>
                        <TouchableOpacity style={styles.addbtn} onPress={Addswh}>
                            <Icon3 name="add-circle-outline" style={styles.actionButtonIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editbtn} onPress={areaEdit}>
                            <Icon2 name="edit" style={styles.actionButtonIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deletebtn} onPress={areaDmode}>
                            <Icon1 name="delete-outline" style={styles.actionButtonIcon} />
                        </TouchableOpacity>
                    </View>
                </View> */}
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
                                <Text style={styles.Alerttext}> Are you sure you want delete this area?</Text>
                            </View>
                            <View style={styles.Alertbottom}>
                                <View style={styles.Alertbutton1}>
                                    <Button  mode="outlined" onPress={cancelAlert} >
                                    Cancel
                                    </Button>
                                </View>
                                <View style={styles.Alertbutton2}>
                                    <Button  mode="outlined" onPress={deleteswitch}>
                                    Ok
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={Editalert}
                    transparent
                    onRequestClose={() => SetEditalert(false) }
                >
                    <View  style={styles.maincontainer}>
                        <View style={styles.Alertbox2}>
                            <View style={styles.AlertTittle}>
                                <Text style={styles.EditTittle}>Edit Switch</Text>
                                <Text style={styles.desctext}>You can change the Switch here</Text>
                            </View>
                            <View styles={styles.centerpart}>
                                <View style={styles.editinput}>
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={text => setText(text)}
                                    value={text}
                                />
                                </View>
                            </View>
                            <View style={styles.Alertbottom}>
                                <View style={styles.Alertbutton1}>
                                    <Button  mode="outlined" onPress={cancelAlert} >
                                    Cancel
                                    </Button>
                                </View>
                                <View style={styles.Alertbutton2}>
                                    <Button  mode="outlined" onPress={editswitchname}>
                                    Ok
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Modal
                    visible={addswitch}
                    transparent
                    onRequestClose={() => setAddswitch(false) }
                >
                    <View  style={styles.maincontainer}>
                        <View style={styles.Addbox}>
                            <View style={styles.Addboxtitle}>
                                <Text style={styles.Addboxtittle}>Select Category</Text>
                                <Text style={styles.Addboxdesc}>Choose Your Switch Layout</Text>
                            </View>
                        <View style={styles.selectswitch}>
                            <FlatList
                                data={switches}
                                numColumns={2}
                                columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 15}}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) =>(
                                        <Switchcap item={item} onPress={()=> confirm(item)} />
                                    )
                                }
                            />
                        </View>
                        <View style={styles.Alertbottom}>
                        </View>
                    </View>
                    </View>
                </Modal>
                <Modal
                    visible={addconfirm}
                    transparent
                    onRequestClose={() => setaddconfirm(false) }
                >
                    <View  style={styles.maincontainer}>
                        <View style={styles.Alertbox}>
                            <View style={styles.AlertTittle}>
                                <Text style={styles.Alerttext}> Are you sure you Want Add This Switch?</Text>
                            </View>
                            <View style={styles.Alertbottom}>
                                <View style={styles.Alertbutton1}>
                                    <Button  mode="outlined" onPress={cancelAlert} >
                                    Cancel
                                    </Button>
                                </View>
                                <View style={styles.Alertbutton2}>
                                    <Button  mode="outlined" onPress={uploadSwitch}>
                                    Ok
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={styles.mainPart}>
            <View style={styles.Areacontainer} >
                <FlatList
                        data={area}
                        numColumns={2}
                        columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 15}}
                        renderItem={({ item }) => (
                                <Switchlayout item={item} onPress={()=> Navcontroller(item)} AreaName={areaName} mode={mode} userid={userid} areaName={areaName} />
              )}
                    />
                <Provider>
                    <Portal>
                        <FAB.Group
                        open={open}
                        fabStyle= {{backgroundColor: COLORS.primary}}
                        icon={open ? icons.back : 'plus'}
                        actions={[
                            { 
                            icon: 'plus',
                            label: 'Add switch',
                            onPress: Addswh,
                            small: false,
                            },
                            {
                            icon: icons.edit,
                            label: 'Edit switch',
                            onPress: editmode,
                            small: false,
                            },
                            {
                            icon: 'delete',
                            label: 'Delete Switch',
                            onPress: areaDmode,
                            small: false,
                            }
                        ]}
                        onStateChange={onStateChange}
                        onPress={() => {
                            if (open) {
                            // do something if the speed dial is open
                            }
                        }}
                        />
                    </Portal>
                    </Provider>
            </View>
            </View>

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

export default SwitchBox;

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
  Alertbox: {
      width: width - 10,
      height: 150,
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
      alignItems: 'center'
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
  Alertbutton11: {
      width: '50%',
      height: 40,
      paddingHorizontal: 10,
      alignItems: 'center'
  },
  Alertbutton22: {
      width: '50%',
      height: 40,
      paddingHorizontal: 10,
      alignItems: 'center'
  },
  Addbox: {
      width: width - 30,
      height: 380,
      backgroundColor: COLORS.white,
      borderRadius: 50,
  },
  Addboxtitle: {
      padding: 20,
      alignItems: 'center'
  },
  Addboxtittle: {
      fontFamily: 'Medium',
      fontSize: 20,
  },
  Addboxdesc: {
      fontFamily: 'Light',
      fontSize: 10,
      color: COLORS.lightGray3
  },
    mainPart: {
        flex: 6,
        backgroundColor: COLORS.lightGray4,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        width: "100%",
    },
  Areacontainer: {
        paddingTop: '10%',
        paddingHorizontal: 20, 
        flex: 1,
        zIndex: 1,
    },
    tools: {
        width: '100%',
        height: 50,
        alignItems: 'flex-end',
    },
    tool: {
        width: '40%',
        height: 50,
        flexDirection: 'row',
    },
    addbtn: {
        width: '25%',
        height: 50,
        marginLeft: 5,
    },
    deletebtn: {
        width: '25%',
        height: 50,
        marginLeft: 5,
    },
    editbtn: {
        width: '25%',
        height: 50,
        marginLeft: 5,
    },
    Alertbox: {
      width: width - 10,
      height: 150,
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
      alignItems: 'center'
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
  Alertbox2: {
      width: width - 10,
      height: 260,
      borderRadius: 20,
      backgroundColor: COLORS.white,
  },
  AlertTittle2: {
      margin: 5,
      paddingVertical: 20,
      paddingHorizontal: 10,
      alignItems: 'center'
  },
  EditTittle: {
      fontSize: 20,
      fontFamily: 'Bold',

  },
  desctext: {
      fontSize: 10,
      fontFamily: 'Light',
      color: COLORS.lightGray3,
      alignItems: 'center',
  },
  centerpart: {
      height: 120, 
      alignItems: 'center',
      justifyContent: 'center',
  },
  editinput: {
      height: 50,
      paddingHorizontal: 30,
      marginBottom: 30,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: COLORS.primary,
    fontFamily: 'Medium',
    fontSize: 15,
  },

});
