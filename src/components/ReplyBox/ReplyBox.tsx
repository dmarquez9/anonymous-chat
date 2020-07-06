import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

import { addMessage } from '../../firebase/chatMessages'
import { useUser } from '../../context/user'

const Box = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid rgba(0,0,0,.2);
  height: 64px;
  padding: 0 15px;
`
const MessageInput = styled(Form.Control)`
  border-color: transparent;
  flex: 1;
  padding-left: 0;

  &:hover, &:focus {
    box-shadow: none;
    outline: 0;
    border-color: transparent;
  }
`
function ReplyBox () {
  const [message, setMessage] = useState<string>('')
  const { user } = useUser()
  const { chatId } = useParams()

  const handleSubmit = () => {
    addMessage({
      chatId,
      userId: user.uid,
      message 
    })
    setMessage('')
  }

  return (
    <Box>
      <MessageInput
        placeholder="Ingresa un mensaje..."
        value={message}
        onChange={(event : any) => setMessage(event.target.value)}
      />
      <Button variant="outline-primary" onClick={handleSubmit}>Enviar</Button>
    </Box>
  );
}

export default ReplyBox
