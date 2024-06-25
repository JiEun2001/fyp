import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import UserService from '../services/UserService'
import TodoService from '../services/TodoService'
import TextArea from '../components/Textarea'
import TextList from '../components/TextList'
import font from '../Theme/font'
import colors from '../Theme/colors'
import {
	Icon,
	Card,
	CardItem,

} from '@gluestack-ui/themed'
export default  function ToDoList({navigation}) {
  //Set State
  const [task, setTask] = useState({ value: ''})
  const [tasklist, setTasklist] = useState([])
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskKey, setCurrentTaskKey] = useState(null);

  useEffect(()=>{
    TodoService.retrieve(UserService.data.uid).then(setTasklist)
  },[])
  
  const onInsertPressed = ()=> {
    TodoService.insert(task,UserService.data.uid)
    TodoService.retrieve(UserService.data.uid).then(setTasklist);

  }
  const onDeletePressed = (id)=>{
    TodoService.delete(UserService.data.uid,id)
    TodoService.retrieve(UserService.data.uid).then(setTasklist);
  }
  const onUpdatePressed = () => {
    if (currentTaskKey) {
      TodoService.updateList(UserService.data.uid, currentTaskKey, task.value)
        TodoService.retrieve(UserService.data.uid).then(setTasklist);
        setTask({ value: '' });
        setIsEditing(false);
        setCurrentTaskKey(null);
    }
  };
  const startEditing = (taskKey, taskName) => {
    setTask({ value: taskName });
    setIsEditing(true);
    setCurrentTaskKey(taskKey);
  };

  return (

    <Background>
      <Header>{UserService.data.Name} To-do List</Header>
      <BackButton goBack={navigation.goBack} />
        {tasklist.length > 0 ? (
						tasklist.map((todo, index) => (

							<Card style={styles.cardTodo} key={todo.id}>
                
                <View style={styles.cardItemTodo}>
                  <TextList
                  value={todo.name}
                  label="Task"
                  editable={false}
                  returnKeyType="next"
                  onChangeText={""}
                  />
                  <Text style={styles.taskText}>{todo.Task}</Text>
                  <TouchableOpacity onPress={() => startEditing(todo.id, todo.name)}>
                    <Text style={styles.deleteText}>Update </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onDeletePressed(todo.id)}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
								
							</Card>
						))
					) : (
						<View style={{ height: 100 }}></View>
					)}
      <TextInput
        label="Todo"
        returnKeyType="next"
        value={task.value}
        onChangeText={(text) => setTask({value: text})}
        // error={!!email.error}
        // errorText={email.error}
        autoCapitalize="none"
      />
      <Button mode="contained" onPress={isEditing ? onUpdatePressed : onInsertPressed}>
        {isEditing ? "Update" : "Insert"}
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
