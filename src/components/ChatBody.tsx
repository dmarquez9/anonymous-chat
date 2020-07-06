import React from 'react'
import styled from 'styled-components'
import {
  Switch,
  Route
} from 'react-router-dom';

// Components
import Navbar from './Navbar'
import ChatMessages from './ChatMessages'

const ChatLayout = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #f9f9f9;
  height: 100vh;
  max-width: 100%;
  overflow: hidden;
`
const EmptyChat = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
`

function ChatBody () {
  return (
    <ChatLayout>
      <Navbar />
      <Switch>
        <Route path={["/category/:chatId", "/chat/:chatId"]}>
          <ChatMessages />
        </Route>
        <Route path="/" exact>
          <EmptyChat>
            <h3>Entra en un chat para empezar.</h3>
          </EmptyChat>
        </Route>
      </Switch>
    </ChatLayout>
  );
}

export default ChatBody
