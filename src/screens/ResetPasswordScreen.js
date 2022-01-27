import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import { sendEmailWithPassword } from '../api/auth-api'
import Toast from '../components/Toast'
import { COLORS, icons } from '../constants'

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ value: '', type: '' })

  const sendResetPasswordEmail = async () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    setLoading(true)
    const response = await sendEmailWithPassword(email.value)
    if (response.error) {
      setToast({ type: 'error', message: response.error })
    } else {
      setToast({
        type: 'success',
        message: 'Email with password has been sent.',
      })
    }
    setLoading(false)
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <View style={styles.formArea}>
       <View style={styles.spacing}>
        <Text style={styles.textContainer}> Reset Password </Text>
        <TextInput
          label="E-mail address"
          returnKeyType="done"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          description="You will receive email with password reset link."
        />
        <Button
          loading={loading}
          mode="contained"
          onPress={sendResetPasswordEmail}
          style={{ marginTop: 16 }}
        >
          Send Instructions
        </Button>
        <Toast {...toast} onDismiss={() => setToast({ value: '', type: '' })} />
        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  spacing: {
    paddingHorizontal: 20,
  },
  formArea: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    top: '30%',
    paddingBottom: 40,
    position: 'relative'
  },
  textContainer: {
    color: COLORS.primary,
    fontFamily: 'Bold',
    fontSize: 24,
    paddingVertical :'5%',
    alignSelf: 'center',
  },

});