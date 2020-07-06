import React, { useEffect, useState } from 'react'
import { chatMessagesDb, deleteSelectedMessage } from '../firebase/chatMessages'
import { getDisplayName } from '../firebase/user'

import {
  ChatMessagesProps,
  DeleteMessageProps,
  initalChatMessagesContext,
  ChatMessagesContextProps
} from '../types/chatMessages'

const ChatMessagesContext = React.createContext<ChatMessagesContextProps>(initalChatMessagesContext)

function ChatMessagesProvider ({ children, chatId } : any) {
  const [messages, setMessages] = useState<ChatMessagesProps[]>([])
  
  useEffect(() => {
    const fetchMessages = async () => {
      chatMessagesDb(chatId).on('value', async (snapshot : any) => {
        const messagesValues = snapshot.val()
        const messagesList : ChatMessagesProps[] = []

        for (let message in messagesValues){
          const displayName = await getDisplayName(messagesValues[message].userId)
          messagesList.push({
            uid: message,
            content: messagesValues[message].content,
            userId: messagesValues[message].userId,
            chatId,
            date: messagesValues[message].data,
            time: messagesValues[message].time,
            author: displayName,
            deleted: messagesValues[message].deleted
          });
        }

        setMessages(messagesList)
      }) 
    }
    
    fetchMessages()
  }, [chatId])

  const deleteMessage = async (data : DeleteMessageProps) => await deleteSelectedMessage(data)

  return <ChatMessagesContext.Provider value={{ messages, deleteMessage}} children={children} />
}

function useChatMessages() {
  const context = React.useContext(ChatMessagesContext)
  if (context === undefined) {
    throw new Error(`useChatMessages must be used within a ChatMessagesProvider`)
  }
  return context
}

export { ChatMessagesProvider, useChatMessages }
