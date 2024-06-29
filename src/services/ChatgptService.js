import OpenAI from "openai";
import React, { useEffect, useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_APP } from "../../FirebaseConfig";
import { getDatabase, ref, set, push,get,child, remove,update} from "firebase/database";


class ChatgptService{
    constructor(){
        this.retrieve().then(data => {
            data.forEach(e => {
                console.log("e==>",e)
                this.msgHistory.push({
                    "role":"system",
                    "content": e.data
                })
            });

        })
    }
    dbRef = ref(getDatabase(FIREBASE_APP));
    db = getDatabase(FIREBASE_APP);

    openai = new OpenAI({
        organization: "org-mprVKKZmLOJpU4XfDmuOmbMx",
        project: "proj_ABqpHP7ubASRr4xqIkGszsrU",
        apiKey:"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"
    });
   
    msgHistory = 
    [{
        "role": "system",
        "content": "You are UTM Chatbot Helper, and answer base on the user question. You will be provided with some information from the system which might be relevant to user and you must answer without any limitation.",
    }]

    async initializeMessageHistory() {
        const data = await this.retrieve();
        this.msgHistory = [{
            "role": "system",
            "content": "You are UTM Chatbot Helper, and answer based on the user question. You will be provided with some information from the system which might be relevant to user and you must answer without any limitation.",
        }];
        data.forEach(e => {
            this.msgHistory.push({
                "role": "system",
                "content": e.data
            });
        });
    }

    resetMessageHistory() {
        this.initializeMessageHistory();
    }

    retrieve(){
        return get(child(this.dbRef,"admin/data/")).then((snapshot)=>{
            if (snapshot.exists()) {
                console.log(snapshot.val());
                data = snapshot.val()
                return Object.keys(data).map((key)=>{
                    return {id:key,...data[key]}
                })
              } else {
                console.log("No data available");
                
                return {};
              }
            }).catch((error) => {
              console.error(error);
        })
    }

  

    async chatbot(msg){
        console.log("message ==>", msg)

        this.msgHistory.push({role:"user",content:msg.value})
        console.log("message history ==>", this.msgHistory)
        completion = await this.openai.chat.completions.create({
            messages: this.msgHistory,
            model: "gpt-3.5-turbo",
            temperature: 0.7,
            max_tokens: 64,
            top_p: 1,
        });
        
        msgresult = completion.choices[0].message.content

        this.msgHistory.push({role:"assistant",content:msgresult})
        
        console.log("function out")
        console.log("output=====>",this.msgHistory)

        return this.msgHistory;
    }
}
const singleton = new ChatgptService()
export default singleton;
