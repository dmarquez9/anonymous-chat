import React from 'react'
import { useParams } from 'react-router-dom';

import { ChatMessagesProvider } from '../context/chatMessages'
import MessageList from './MessageList'
import ReplyBox from './ReplyBox'

function ChatMessages () {
  const { chatId } = useParams()

  return (
    <ChatMessagesProvider chatId={chatId}>
      <MessageList />
      <ReplyBox />
    </ChatMessagesProvider>
  );
}

export default ChatMessages
