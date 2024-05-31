import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { FIREBASE_AUTH } from '../../FirebaseConfig'
import AuthServices from '../services/AuthService'
import UserService from '../services/UserService'
import Tab from '../components/TabNavigation'
import TabNavigation from '../components/TabNavigation'

export default function Dashboard({ navigation }) {

  const onLogOutPressed = () => {
    AuthServices.logOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    })
  }

  return (
    <Background>
      <Logo />
      <Header>Welcome {UserService.data.Name}</Header>
      <Paragraph>
        This is Dashboard
      </Paragraph>
      <Button
        mode="outlined"
        onPress={onLogOutPressed}
      >
        Logout
      </Button>
      {/* <TabNavigation/> */}
    </Background>
  )
}
