import { db } from './config'
import { NewMessageProps, DeleteMessageProps } from '../types/chatMessages'

export const chatMessagesDb = (chatId : string) => db.ref(`chatMessages/${chatId}`)

export const addMessage = async ({ chatId, userId, message } : NewMessageProps) => {
  const currentDate = new Date()
  return chatMessagesDb(chatId).push({ 
    content: message,
    userId,
    date: `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`,
    time: `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
    deleted: false
  })
}

export const deleteSelectedMessage = async ({ chatId, messageId }: DeleteMessageProps) => {
  db.ref(`chatMessages/${chatId}/${messageId}`).update({ deleted: true })
}