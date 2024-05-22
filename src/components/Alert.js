export default function Alert({}){
    return(
        Alert.alert('Invalid Credential', 'Check your email and password', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ])
    )
}