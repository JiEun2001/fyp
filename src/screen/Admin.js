import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, View, ScrollView} from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import UserService from '../services/UserService'
import AdminService from '../services/AdminService'
import TextArea from '../components/Textarea'
import TextList from '../components/TextList'
import font from '../Theme/font'
import colors from '../Theme/colors'
import {
	Icon,
	Card,
	CardItem,

} from '@gluestack-ui/themed'

export default function Admin({ navigation }) {

  const[data,setData]=useState({})
  const[datalist,setDatalist]=useState({})
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskKey, setCurrentTaskKey] = useState(null);
  
  useEffect(()=>{
    AdminService.retrieve().then(setDatalist)
  },[])

  const onInsertPressed = ()=> {
    AdminService.insert(data)
    AdminService.retrieve().then(setDatalist);

  }
  const onDeletePressed = (id)=>{
    AdminService.delete(id)
    AdminService.retrieve().then(setDatalist);
  }
  const onUpdatePressed = () => {
    if (currentTaskKey) {
        AdminService.updateList( currentTaskKey, data.value)
        AdminService.retrieve().then(setDatalist);
        setData({ value: '' });
        setIsEditing(false);
        setCurrentTaskKey(null);
    }
  };
  const startEditing = (taskKey, taskName) => {
    setData({ value: taskName });
    setIsEditing(true);
    setCurrentTaskKey(taskKey);
  };


  const onLogOutPressed = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    })
  }

  return (
    <Background>
      <Header>Admin Page</Header>
      <ScrollView>
        {datalist.length > 0 ? (
            datalist.map((info, index) => (

            <Card style={styles.cardTodo} key={info.id}>
                
                <View style={styles.cardItemTodo}>
                  <TextList
                  value={info.data}
                  label="Data"
                  editable={false}
                  returnKeyType="next"
                  onChangeText={""}
                  />
                  <Text style={styles.taskText}>{}</Text>
                  <TouchableOpacity onPress={() => startEditing(info.id,info.data)}>
                    <Text style={styles.deleteText}>Update </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onDeletePressed(info.id)}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
								
							</Card>
						))
					) : (
						<View style={{ height: 100 }}></View>
					)}
            </ScrollView>
      <TextInput
        label="Data"
        returnKeyType="next"
        value={data.value}
        onChangeText={(text) => setData({value: text})}
        autoCapitalize="none"
      />
      <Button mode="contained" onPress={isEditing ? onUpdatePressed : onInsertPressed}>
        {isEditing ? "Update" : "Insert"}
      </Button>
      <Button
        mode="outlined"
        onPress={onLogOutPressed}
      >
        Logout
      </Button>
    </Background>
  )
}


const styles = StyleSheet.create({

    userText: {
      fontSize: 26,
      fontFamily: font.PoppinsBold,
      color: colors.white,
    },
    userTextContainer: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginTop: -350,
    },
    todoInput: {
      backgroundColor: colors.white,
      paddingHorizontal: 8,
      borderRadius: 5,
      borderColor: 'transparent',
      marginTop: 8,
      height: 45,
    },
    cardTodo: {
      borderRadius: 5,
      elevation: 0,
      borderColor: 'transparent',
      marginBottom: 10,
    },
    cardItemTodo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
      backgroundColor: colors.white,
    },
    taskText: {
      fontSize: 16,
      color: colors.black,
    },
  })
  