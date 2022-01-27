import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { COLORS } from '../constants'

export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={COLORS.plogin}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    height: 36,
    backgroundColor: COLORS.surface,
    

   },
  description: {
    fontSize: 10,
    color: COLORS.slogin,
    paddingTop: 10,
  },
  error: {
    fontSize: 10,
    color: COLORS.error,
    paddingTop: 8,
  },
})
