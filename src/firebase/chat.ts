import { db } from './config'
import { NewChatProps } from '../types/chat'

export const chatDb = db.ref('chats')

export const createChat = async (chat : NewChatProps) => {
  const members = {
    [chat.userId]: true,
    [chat.chatWithId]: true 
  }

  const chatDbRef = await chatDb.push({ members })
  return chatDbRef.key
}