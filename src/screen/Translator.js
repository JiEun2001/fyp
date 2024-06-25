import React, { useState }  from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { FIREBASE_AUTH } from '../../FirebaseConfig'
import AuthServices from '../services/AuthService'
import UserService from '../services/UserService'
import Tab from '../components/TabNavigation'
import Chatgpt from '../services/ChatgptService'
import TextInput from '../components/TextInput'
import TextArea from '../components/Textarea'
import { Chat } from 'openai/resources'

export default function Translator({ navigation }) {

    msgTranslate = ''
  const onPressTranslate = async () => {
    console.log("translate pressed")
    msgTranslate =await Chatgpt.chatbot(msg)
    console.log("msgTranslate ===>",msgTranslate)
    formattedMsg = msgTranslate.filter(f => f.role != "system").map(m => `${m.role}: ${m.content}`).join('\n');

    setMsgChat(formattedMsg)
  }
  const [msg, setMsg] = useState({ value: ''})
  const [msgChat, setMsgChat] = useState({})
  return (
    <Background>
      {/* <Header>Welcome {UserService.data.Name}</Header> */}
     <TextArea
     editable={false}
     multiline={true}
     numberOfLines={20}
     value={msgChat}
     />
     <TextInput
     label="Please Enter Your Message"
     returnKeyType="next"
     onChangeText={(text) => setMsg({ value: text, role:'user'})}
     />

      <Button
        mode="outlined"
        onPress={onPressTranslate}
      >
        Translate
      </Button>
      {/* <TabNavigation/> */}
    </Background>
  )
}

