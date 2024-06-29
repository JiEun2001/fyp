import React, { useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import AuthServices from '../services/AuthService';
import UserService from '../services/UserService';
import Tab from '../components/TabNavigation';
import Chatgpt from '../services/ChatgptService';
import TextInput from '../components/TextInput';
import TextArea from '../components/Textarea';
import BackButton from '../components/BackButton'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function Translator({ navigation }) {

  useFocusEffect(
    React.useCallback(() => {
        const resetChatHistory = async () => {
            await Chatgpt.initializeMessageHistory();
        };
        resetChatHistory();

        return () => {
            Chatgpt.resetMessageHistory();
        };
    }, [])
);

  const [msg, setMsg] = useState({ value: '' });
  const [msgChat, setMsgChat] = useState([]);

  const onPressTranslate = async () => {
    console.log("translate pressed")
    const msgTranslate = await Chatgpt.chatbot(msg);
    console.log("msgTranslate ===>", msgTranslate);
    const formattedMsg = msgTranslate.filter(f => f.role !== "system").map(m => ({ role: m.role, content: m.content }));

    setMsgChat(formattedMsg);
  }

  return (
    <Background>
      <Header>Chatbot</Header>
      <BackButton goBack={navigation.goBack} />
      <ScrollView style={[styles.chatContainer,{ marginTop: 20 }]}>
        {msgChat.map((msgItem, index) => (
          <View key={index} style={msgItem.role === 'user' ? styles.userMessage : styles.assistantMessage}>
            <Text style={msgItem.role === 'user' ? styles.userText : styles.assistantText}>
              {msgItem.content}
            </Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        label="Please Enter Your Message"
        returnKeyType="next"
        onChangeText={(text) => setMsg({ value: text, role: 'user' })}
      />
      <Button
        mode="outlined"
        onPress={onPressTranslate}
      >
        Translate
      </Button>
      {/* <TabNavigation /> */}
    </Background>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  userMessage: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  assistantMessage: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  userText: {
    backgroundColor: '#b2dfdb',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  assistantText: {
    backgroundColor: '#ffcc80',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
});
