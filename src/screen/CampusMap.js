import React ,{ useState } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { FIREBASE_AUTH } from '../../FirebaseConfig'
import AuthServices from '../services/AuthService'
import UserService from '../services/UserService'
import MapView from 'react-native-maps'
import { View ,StyleSheet } from 'react-native'
import TextInput from '../components/TextInput'
import { GOOGLE_MAPS_APIKEY } from '../../googleMapKey'
import MapViewDirections from 'react-native-maps-directions'

export default function CampusMap({ navigation }) {

  const [state,setState] = useState({
    pickupCords: {
      latitude: 1.566014, 
      longitutde: 103.633416
    },
    droplocationCors: {
      latitude: 1.564472,
      longitude: 103.637460,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  })
  const origin = {
    latitude: 1.566014, 
    longitutde: 103.633416
  }
  const {pickupCords, droplocationCords} = state

  const onLogOutPressed = () => {
    AuthServices.logOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    })
  }

  return (
    <Background>

      <MapView
        style={{
        margin: 20,
        width: 300,
        height: 300,}}
        initialRegion={{
          pickupCords
        }}
      >
         <MapViewDirections
          origin={origin}
          destination={droplocationCords}
          apikey={"AIzaSyBmcmgVeyhkor3fsgqwF5anqjOdNxh7aQc"}
        />
      </MapView>
      <TextInput
        label="Destination start"
        returnKeyType="done"
        // value={password.value}
        // error={!!password.error}
        // errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Destination End"
        returnKeyType="done"
        // value={password.value}
        // error={!!password.error}
        // errorText={password.error}
        secureTextEntry
      />
      
      
      {/* <Header>Welcome {UserService.data.Name}</Header> */}
      
      <Button
        mode="outlined"
        onPress={onLogOutPressed}
      >
        Logout
      </Button>
    </Background>
  )
}
