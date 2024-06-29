import React, { useState, useRef } from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import AuthServices from '../services/AuthService';
import UserService from '../services/UserService';
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, Text } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import BackButton from '../components/BackButton'
import { useFocusEffect } from '@react-navigation/native';

export default function CampusMap({ navigation }) {
  const [state, setState] = useState({
    pickupCords: {
      latitude: 1.5555,
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
    },
    time: 0,
    distance: 0,
  });

  const mapref = useRef();

  const fetchValues = (data) => {
    setState({
      pickupCords: {
        latitude: data.pickupCords.latitude,
        longitude: data.pickupCords.longitude,
      },
      droplocationCords: {
        latitude: data.droplocationCords.latitude,
        longitude: data.droplocationCords.longitude,
      },
    });
    console.log('data====', data);
  };

  const fetchTime = (d, t) => {
    setState((state) => ({ ...state, distance: d, time: t }));
  };

  const { time, distance, pickupCords, droplocationCords } = state;

  const onLogOutPressed = () => {
    AuthServices.logOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    });
  };

  return (
    <Background>
      <Header>Welcome {UserService.data.Name}</Header>
      <BackButton goBack={navigation.goBack} />
      {distance !== 0 && time !== 0 && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Time: {time}</Text>
          <Text style={styles.infoText}>Distance: {distance} km</Text>
        </View>
      )}
      <MapView
        ref={mapref}
        style={styles.map}
        initialRegion={{
          latitude: 1.5555,
          longitude: 103.6382,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={pickupCords} />
        <Marker coordinate={droplocationCords} />
        <MapViewDirections
          origin={pickupCords}
          destination={droplocationCords}
          apikey={"AIzaSyBmcmgVeyhkor3fsgqwF5anqjOdNxh7aQc"}
          strokeWidth={3}
          strokeColor="hotpink"
          optimizeWaypoints={true}
          onReady={(result) => {
            const duration = result.duration;
            const hours = Math.floor(duration / 60);
            const minutes = Math.round(duration % 60);

            const formattedTime = `${hours} hour(s) and ${minutes} minute(s)`;
            console.log(`time: ${formattedTime}`);

            fetchTime(result.distance, formattedTime);

            mapref.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: 30,
                bottom: 100,
                left: 30,
                top: 100,
              },
            });
          }}
        />
      </MapView>
      
        <Button mode="contained" onPress={() => navigation.navigate('ChooseLocation', { getCordinates: fetchValues })}>
          Choose Location
        </Button>
      
    </Background>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  map: {
    margin: 20,
    width: '100%',
    height: 500,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
