import React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { theme } from './src/core/theme'
import { navigationRef } from './src/services/RootNavigation';
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  CampusMap,
} from './src/screen'
import { 
  Register
} from './src/View'
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <Provider theme={theme}>
      <NavigationContainer  ref={navigationRef}>
        
        <Stack.Navigator
          initialRouteName="CampusMap"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="CampusMap" component={CampusMap} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
