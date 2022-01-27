import React from 'react'
import { Snackbar } from 'react-native-paper'
import { StyleSheet, View, Text } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { COLORS } from '../constants'

export default function Toast({ type = 'error', message, onDismiss }) {
  return (
    <View style={styles.container}>
      <Snackbar
        visible={!!message}
        duration={3000}
        onDismiss={onDismiss}
        style={{
          backgroundColor:
            type === 'error' ? COLORS.error : COLORS.sucess,
        }}
      >
        <Text style={styles.content}>{message}</Text>
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 80 + getStatusBarHeight(),
    width: '100%',
  },
  content: {
    fontWeight: '500',
  },
})
