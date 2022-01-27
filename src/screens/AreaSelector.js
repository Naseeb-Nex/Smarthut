import React , { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    FlatList,
    Modal,
    Dimensions,

} from "react-native";
import 'react-native-gesture-handler';
import { icons, images, SIZES, COLORS } from '../constants'
import AreaBox from '../components/AreaBox'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import * as firebase from 'firebase'
import 'firebase/database';

const Areas = [
  {
    id: 1,
    AreaName: 'Living Room',
    AreaImg: images.LRoom,
  },
  {
    id: 2,
    AreaName: 'Bed Room',
    AreaImg: images.BRoom,
  }, 
  {
      id: 3,
      AreaName: 'Kitchen',
      AreaImg: images.Kitchen
  },
  {
      id: 4,
      AreaName: 'Dining Room',
      AreaImg: images.Dining
  },
  {
      id: 5,
      AreaName: 'Office Room',
      AreaImg: images.Office
  },
  {
      id: 6,
      AreaName: 'Outdoor',
      AreaImg: images.Outdoor
  },
  {
      id: 7,
      AreaName: 'Gaming Room',
      AreaImg: images.Gaming
  },
  {
      id: 8,
      AreaName: 'Custome',
      AreaImg: icons.Applogo
  }
];


const AreaSelector = ({ route, navigation }) => {

    const [showAlert, SetshowAlert] =  React.useState(false);
    const [userid, Setuserid] = React.useState();
    const [areaName, SetareaName] = React.useState('');
    const [areaImg, SetareaImg] = React.useState('');
    const [areaid, Setareaid] = React.useState();
    
    const Alertpopup = box => {
        SetshowAlert(true);
        Setuserid(route.params.user)
        SetareaName(box.AreaName);
        SetareaImg(box.AreaImg);
        Setareaid(box.id)
        console.log(userid);
        console.log(areaName);
        console.log(areaImg);
    };

    const cancelAlert = () => {
        SetshowAlert(false);
    };

    const uploadArea = async () => {

    firebase
    .database()
    .ref('users/' + userid + '/areas/' + areaName )
    .set({
      id: areaid,
      userId: userid,
      AreaName: areaName,
      AreaImg: areaImg,
    })
    .then(()=> {
        console.log('Uploaded');
        navigation.navigate('Home', { name: 'Home'})
    })
    .catch((error) => {
        cosole.log('error !!',error)
        }
    )
        
    };

    
    return (
        <View style={styles.container}>
            <Modal
                visible={showAlert}
                transparent
                onRequestClose={() => SetshowAlert(false) }
            >
                <View  style={styles.maincontainer}>
                    <View style={styles.Alertbox}>
                        <View style={styles.AlertTittle}>
                            <Text style={styles.Alerttext}> Are you sure you want to continue?</Text>
                        </View>
                        <View style={styles.Alertbottom}>
                            <View style={styles.Alertbutton1}>
                                <Button  mode="outlined" onPress={cancelAlert} >
                                Cancel
                                </Button>
                            </View>
                            <View style={styles.Alertbutton2}>
                                <Button  mode="outlined" onPress={uploadArea}>
                                Ok
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <BackButton goBack={navigation.goBack} />
            <View style={styles.top}>
                <View style={{ flexDirection: 'row', height: '90%' , justifyContent: 'center', width: '100%', alignItems: 'center'}}>
                    <Text style={{ fontSize: SIZES.h3, fontFamily: 'Medium', color: 'white' }}>Area Selector</Text>
                </View>
            </View>
            <View style={styles.mainPart}>
                <View style={styles.Areacontainer} >
                    <FlatList
                        data={Areas}
                        numColumns={2}
                        columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 15}}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                                <AreaBox onPress={() => Alertpopup(item)} item={item} mode={'DIS'} />
              )}
                    />
                </View>
            </View>
        </View>
    );
};
export default AreaSelector;

const width = Dimensions.get('window').width - 40

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        paddingTop: Platform.OS === 'android' ? 30 : 0
    },
    top: {
        flex: 1
    },
    mainPart: {
        flex: 6,
        backgroundColor: COLORS.lightGray4,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        width: "100%",
    },
    toppadding: {
        height: '8%',
        width: '100%'
    },
    Areacontainer: {
        paddingTop: '10%',
        paddingHorizontal: 20, 
        flex: 1,
        zIndex: 1,
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


})