import React, { useState, useEffect } from 'react'
import { chatDb, createChat } from '../firebase/chat'
import { getDisplayName } from '../firebase/user'
import { ChatProps, ChatContextProps, initialChat, NewChatProps } from '../types/chat'

const ChatContext = React.createContext<ChatContextProps>(initialChat)

function ChatProvider ({ children, userId } : any) {
  const [chats, setChats] = useState<ChatProps[]>([])
  
  useEffect(() => {
    const fetchChats = async () => {
      if (userId) {
        chatDb.orderByChild(`members/${userId}`).equalTo(true).on('value', async (snapshot : any) => {
          const getChats = snapshot.val()
          const chatList : ChatProps[] = []

          for (let chat in getChats){
            const getMembers = Object.keys(getChats[chat].members).filter(key => key !== userId)
            const displayName = await getDisplayName(getMembers[0])

            chatList.push({
              uid: chat,
              title: displayName
            });
          }

          setChats(chatList)
        })
      }
    }
    
    fetchChats()
  }, [userId])

  const createNewChat = async (chat: NewChatProps) => await createChat(chat)
  return <ChatContext.Provider value={{ chats, createNewChat }} children={children} />
}

function useChat() {
  const context = React.useContext(ChatContext)
  if (context === undefined) {
    throw new Error(`useChat must be used within a ChatProvider`)
  }
  return context
}

export { ChatProvider, useChat }
