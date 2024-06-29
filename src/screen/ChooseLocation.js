import React, { useState,useEffect} from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import AddressPickUp from '../components/AddressPickUp'
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location';
import { Checkbox } from 'react-native-paper';

export default function ChooseLocation(props) {

  const navigation = useNavigation();


  const [state,setState] = useState ({
    pickupCords: {},
    droplocationCords: {}
  })

  const {pickupCords, droplocationCords} = state

  const [location, setLocation] = useState(null);
  const [checked, setChecked] = useState(false);

  const onCheckboxCheck= async () => {
    setChecked(!checked);
    if (!checked) {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setState({
        ...state,
        pickupCords: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
      });
    } else {
      setState({
        ...state,
        pickupCords: {}
      });
    }
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

  

  const onDone =() => {
    props.route.params.getCordinates({
      pickupCords,
      droplocationCords
    })
    navigation.goBack()
  }
  return (
    <Background>
        <View style={[styles.checkboxContainer,{ marginTop: 20 }]}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              onCheckboxCheck();
            }}
          />
          <Text style={styles.checkboxLabel}>Use Current Location as Starting Point</Text>
        </View>
        {!checked && (
        <AddressPickUp
          placeholderText="Enter First Destination"
          fetchAddress={fetchAddressCords}
        />
        )}
        <AddressPickUp
        placeholderText="Enter Second Destination"
        fetchAddress={fetchDestinationCords}
        />
      {/* <Header>Welcome {UserService.data.Name}</Header> */}
      {/* </ScrollView> */}
      <Button
        mode="outlined"
        onPress={onDone}
      >
        Confirm
      </Button>
      {/* <TabNavigation/> */}
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
});