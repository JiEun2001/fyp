import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import React from "react";



export default function AddressPickUp({placeholderText,fetchAddress}){

    const onPressAddress= (data, details) => {
        // console.log("details ==>",details)
        const lat = details.geometry.location.lat
        const lng = details.geometry.location.lng
        fetchAddress(lat,lng)
    }
    return(
        <GooglePlacesAutocomplete
        styles={{
            margintop:50,
            textInputContainer: {
              width: '100%',
            }}}
            placeholder={placeholderText}
            onPress={onPressAddress}
            fetchDetails={true}
            query={{
                key: 'AIzaSyBmcmgVeyhkor3fsgqwF5anqjOdNxh7aQc',
                language: 'en',
            }}
            // console.log(data, details);
        />
    )
}