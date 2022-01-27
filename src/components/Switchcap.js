import React , { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { icons, images, SIZES, COLORS, FONTS } from '../constants'

export default function ({ item, onPress }) {
    const { id, switchName, switchicon} = item;

    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.touch} onPress={onPress}>
            <View style={[styles.cap]}>
                <Text style={[styles.title]}>{switchName}</Text>
            </View>
        </TouchableOpacity>
        </View>
    );
}

const width = Dimensions.get('window').width - 35

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        alignItems: 'center'
    },
    touch: {
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
    }
})
