import React ,{ useState, useRef} from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { FIREBASE_AUTH } from '../../FirebaseConfig'
import AuthServices from '../services/AuthService'
import UserService from '../services/UserService'
import MapView, { Marker } from 'react-native-maps'
import { View ,StyleSheet } from 'react-native'
import TextInput from '../components/TextInput'
import { GOOGLE_MAPS_APIKEY } from '../../googleMapKey'
import MapViewDirections from 'react-native-maps-directions'

export default function CampusMap({ navigation }) {

    const [state,setState] = useState ({
      pickupCords: { 
        latitude: 1.5555 ,
        longitude: 103.6382,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      droplocationCords: {
        // ktdi
        latitude: 1.564472,
        longitude: 103.637460,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    })

  const mapref = useRef()

  const fetchValues = (data)=> {
    setState({
      pickupCords:{
        latitude:data.pickupCords.latitude,
        longitude:data.pickupCords.longitude,
      },
      droplocationCords:{
        latitude:data.droplocationCords.latitude,
        longitude:data.droplocationCords.longitude,

      }
    })
    console.log("data====", data)
  }

  const {pickupCords, droplocationCords} = state
  
  const origin = {latitude: 1.5555, longitude: 103.6382};


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
      ref={mapref}
        style={{
          margin: 20,
          width: 300,
          height: 500}}
        initialRegion={{
          latitude: 1.5555 ,
          longitude: 103.6382,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker 
        coordinate={pickupCords}
        />
        <Marker 
        coordinate={droplocationCords}
        />
        <MapViewDirections
            origin={pickupCords}
            destination={droplocationCords}
            apikey={"AIzaSyBmcmgVeyhkor3fsgqwF5anqjOdNxh7aQc"}
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
            onReady={result => {
              mapref.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 30,
                  bottom: 100,
                  left: 30,
                  top:100
                }
              })
            }}
        />
      </MapView>
{/* 
      <Button
        mode="outlined"
        onPress={onLogOutPressed}
      >
        Log Out
      </Button> */}
      
      
      
      {/* <Header>Welcome {UserService.data.Name}</Header> */}
      
      <Button
        mode="outlined"
        onPress={()=>
          {navigation.navigate('ChooseLocation',{getCordinates: fetchValues})}
        
        }
      >
        Choose Location
      </Button>
    </Background>
  )
}
