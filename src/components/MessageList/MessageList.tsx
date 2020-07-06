import React, { useRef, useLayoutEffect  } from 'react'
import styled from 'styled-components'

import Bubble from './Bubble'
import { useChatMessages } from '../../context/chatMessages'
import { useUser } from '../../context/user'

const List = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 15px;
  overflow: auto;
  min-height: 0;

  &:first-child {
    margin-top: auto !important;
  }
`

function MessageList () {
  const { messages } = useChatMessages()
  const { user } = useUser()
  const messagesEndRef = useRef<HTMLHeadingElement>(null)

  const scrollToBottom = () => {
    if (null !== messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useLayoutEffect (scrollToBottom, [messages])

  return (
    <List>
      {messages
        .filter(message => !(message.deleted && message.userId === user.uid))
        .map(message => <Bubble key={message.uid} data={message} isUserAuthor={(message.userId === user.uid)} />)} 
      <div ref={messagesEndRef} />
    </List>
  );
}

export default MessageList
