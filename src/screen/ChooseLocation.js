import React, { useState} from 'react'
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
import TextInput from '../components/TextInput'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import AddressPickUp from '../components/AddressPickUp'
import CstmBtn from '../components/CstmBtn'
import { useNavigation } from '@react-navigation/native'

export default function ChooseLocation(props) {

  const navigation = useNavigation();


  const [state,setState] = useState ({
    pickupCords: {},
    droplocationCords: {}
  })

  const {pickupCords, droplocationCords} = state

  const onLogOutPressed = () => {
    AuthServices.logOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    })
  }

  const fetchAddressCords= (lat,lng) => {
    console.log("latitude=",lat)
    console.log("longitude=",lng)
    setState({...state, pickupCords: {
      latitude: lat,
      longitude: lng
    }})
  }
  const fetchDestinationCords= (lat,lng) => {
    console.log("latitude=",lat)
    console.log("longitude=",lng)
    setState({...state, droplocationCords: {
      latitude: lat,
      longitude: lng
    }})
  }
  console.log("props = ",props)
  // console.log("Pickup cords =  ",pickupCords)
  // console.log("Destin cords =  ",droplocationCords)

  const onDone =() => {
    props.route.params.getCordinates({
      pickupCords,
      droplocationCords
    })
    navigation.goBack()
  }
  return (
    <Background>
        {/* <ScrollView> */}
        <AddressPickUp
        placeholderText="Enter First Destination"
        fetchAddress={fetchAddressCords}
        />
        <AddressPickUp
        placeholderText="Enter Second Destination"
        fetchAddress={fetchDestinationCords}
        />
        <CstmBtn
        mode="outlined"
        onPress={()=>{
          navigation.goBack
        }}
        >
          done
        </CstmBtn>
      {/* <Header>Welcome {UserService.data.Name}</Header> */}
      {/* </ScrollView> */}
      <Button
        mode="outlined"
        onPress={onDone}
      >
        go back
      </Button>
      {/* <TabNavigation/> */}
    </Background>
  )
}
