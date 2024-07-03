
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, View, ScrollView, } from 'react-native'
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
import { MaterialIcons } from 'react-native-vector-icons'; // Importing MaterialIcons from react-native-vector-icons


export default function Admin({ navigation }) {

  const [data, setData] = useState({ value: '', error: '' });
  const[datalist,setDatalist]=useState({})
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskKey, setCurrentTaskKey] = useState(null);
  
  useEffect(()=>{
    retrieveData();
  },[])


  const retrieveData = async () => {
    const data = await AdminService.retrieve();
    setDatalist(data || []);
  };

  const onInsertPressed = async () => {
    if (!data.value.trim()) {
      setData({ ...data, error: "Data can't be empty." });
      return;
    }

    await AdminService.insert(data);
    await retrieveData();
    setData({ value: '', error: '' });
  };

  
  const onDeletePressed = (id)=>{
    AdminService.delete(id)
    AdminService.retrieve().then(setDatalist);
  }
  const onUpdatePressed = async () => {
    if (currentTaskKey) {
      await AdminService.updateList(currentTaskKey, data.value);
      await retrieveData();
      setData({ value: '', error: '' });
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
                  <View style={styles.iconContainer}>
                  <TouchableOpacity onPress={() => startEditing(info.id,info.data)}>
                    <MaterialIcons name="edit" size={24} color={colors.primary} style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onDeletePressed(info.id)}>
                    <MaterialIcons name="delete" size={24} color={colors.danger} style={styles.icon} />
                  </TouchableOpacity>
                </View>
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
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginLeft: 10,
    },
  })
  