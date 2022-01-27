import React, {useState} from 'react';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { icons, SIZES, COLORS } from '../constants'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { loginUser } from '../api/auth-api'
import Toast from '../components/Toast'

const login = ( {navigation} ) => {

    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [loading, setLoading] = useState()
    const [error, setError] = useState()

    const onLoginPressed = async () => {
      const emailError = emailValidator(email.value)
      const passwordError = passwordValidator(password.value)
      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError })
        setPassword({ ...password, error: passwordError })
        return
      }
      setLoading(true)
      const response = await loginUser({
        email: email.value,
        password: password.value,
      })
      if (response.error) {
        setError(response.error)
      }
      setLoading(false)
    }

      return (
        <View style={styles.container}>
          <View style={styles.top}></View>

          <View style={styles.middle}>
            <Text style={styles.quote}>You are ready to go</Text>

            <View style={styles.formArea}>
              <View style={styles.spacing}>
                <Text style={styles.textContainer}>Log in</Text>
                <TextInput
                  label="Email"
                  returnKeyType="next"
                  value={email.value}
                  onChangeText={(text) => setEmail({ value: text, error: '' })}
                  error={!!email.error}
                  errorText={email.error}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                />
                <TextInput
                  label="Password"
                  returnKeyType="done"
                  value={password.value}
                  onChangeText={(text) => setPassword({ value: text, error: '' })}
                  error={!!password.error}
                  errorText={password.error}
                  secureTextEntry
                />
                <View style={styles.forgotPassword}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ResetPasswordScreen')}
                  >
                    <Text style={styles.forgot}>Forgot your password?</Text>
                  </TouchableOpacity>
                </View>
                <Button loading={loading} mode="contained" onPress={onLoginPressed}>
                  Login
                </Button>
                <View style={styles.row}>
                  <Text>Don’t have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
                    <Text style={styles.link}>Sign up</Text>
                  </TouchableOpacity>
                </View>
                <Toast message={error} onDismiss={() => setError('')} />
              </View>
            </View>
          </View>
          <View style={styles.bottom}></View>
        </View>
      );
}

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    position: 'relative',
    backgroundColor: COLORS.loginbg ,
    paddingRight: 12.7,
    paddingLeft: 12.7,
    height: 250,
  },
  middle: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'transparent',
    paddingLeft: 26.3,
    paddingRight: 26.3,
    alignItems: 'center'
  },
  quote: {
    color: COLORS.white,
    fontFamily: 'Medium',
    fontSize: 24,
    top: '11%',
    paddingVertical :'5%',
    alignSelf: 'center',
  },
  bottom: {
    position: 'relative',
    height: '100%',
    paddingRight: 12.7,
    paddingLeft: 12.7,
    backgroundColor: COLORS.loginbg ,
  },
  textContainer: {
    color: COLORS.primary,
    fontFamily: 'Bold',
    fontSize: 24,
    paddingVertical :'5%',
    alignSelf: 'center',
  },
  spacing: {
    paddingHorizontal: 20,
  },
  formArea: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    top: '16%',
    paddingBottom: 40,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: COLORS.slogin,
  },
  link: {
    fontWeight: 'bold',
    color: COLORS.plogin,
  },
});
