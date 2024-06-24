import OpenAI from "openai";
import React, { useState } from "react";

class ChatgptService{
    openai = new OpenAI({
        organization: "org-mprVKKZmLOJpU4XfDmuOmbMx",
        project: "proj_ABqpHP7ubASRr4xqIkGszsrU",
        apiKey:"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"
    });
   
    msgHistory = 
    [{
        "role": "system",
        "content": "You will be given a sentence, and your task is to translate it to english"
    }]

    async translate(msg){
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
