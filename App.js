import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/components/tabs'
import firebase from 'firebase/app';
import 'firebase/auth';
import { Usersrc,
         SwitchBox,
         Routine, 
         RGBcp, 
         Switchwindow, 
         Edit, 
         Splashsrc, 
         Login,
         ResetPasswordScreen,
         RegisterScreen,
         AuthLoadingScreen,
         AreaSelector,
         Historysrc,
         AI,
         Wheathersrc,
         Hardsrc
    } from './src/screens'
import { FIREBASE_CONFIG } from './src/api/fire'

const Stack = createStackNavigator()

if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG)
  }

const customFonts = {
    'Bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
    'Light': require('./src/assets/fonts/Poppins-Light.ttf'),
    'Numberfont2': require('./src/assets/fonts/TitilliumWeb-Light.ttf'),
    'Numberfont1': require('./src/assets/fonts/TitilliumWeb-Regular.ttf'),
    'code': require('./src/assets/fonts/SourceCodePro-Regular.ttf'),
};

const App = () => {
    const [isLoaded] = useFonts(customFonts);

    if (!isLoaded) {
        return <AppLoading />;
    }

    
  return (
      <NavigationContainer>
           <Stack.Navigator
              screenOptions= {{
                  headerShown: false
              }}
              initailRoutName={"Splashsrc"}
          >
              <Stack.Screen name="Splashsrc" component={Splashsrc}/>
              <Stack.Screen name="AuthLoadingScreen" component={AuthLoadingScreen}/>
              <Stack.Screen name="Login" component={Login}/>
              <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}/>
              <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
              <Stack.Screen name="Home" component={Tabs}/>
              <Stack.Screen name="AreaSelector" component={AreaSelector}/>
              <Stack.Screen name="Usersrc" component={Usersrc}/>
              <Stack.Screen name="SwitchBox" component={SwitchBox}/>
              <Stack.Screen name="Routine" component={Routine}/>
              <Stack.Screen name="RGBcp" component={RGBcp}/>
              <Stack.Screen name="Switchwindow" component={Switchwindow}/>
              <Stack.Screen name="Edit" component={Edit}/>
              <Stack.Screen name="Historysrc" component={Historysrc}/>
              <Stack.Screen name="AI" component={AI}/>
              <Stack.Screen name="Wheathersrc" component={Wheathersrc}/>
              <Stack.Screen name="Hardsrc" component={Hardsrc}/>
           </Stack.Navigator>
      </NavigationContainer>
  )
}


export default App;