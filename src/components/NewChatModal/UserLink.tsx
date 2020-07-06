import React from 'react'
import {
  Dropdown, DropdownButton
} from 'react-bootstrap'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";

import { useChat } from '../../context/chat'
import { useUser } from '../../context/user'
import { UserProps } from '../../types/user'

const UserLinkButton = styled(DropdownButton)`
  margin-bottom: .4rem;
  width: 100%;
  display: block;

  .btn {
    background-color: transparent;
    border-color: transparent;
    color: #2a2a2a;
    width: 100%;
    display: block;
    padding-left: 15px;
    padding-right: 15px;
    text-align: left;

    &:after {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`

type NewChatModalProps = {
  data: UserProps;
  hideModal: any;
}

function UserLink ({ data, hideModal } : NewChatModalProps) {
  const { createNewChat } = useChat()
  const { user } = useUser()
  const history = useHistory()

  const onNewChat = async () => {
    const newChatId = await createNewChat({
      userId: user.uid,
      chatWithId: data.uid
    })
    history.push(`/chat/${newChatId}`)
    hideModal()
  }

  return (
    <UserLinkButton id={`dropdown-user-${data.uid}`} title={data.name}>
      <Dropdown.Item as="button" onClick={() => onNewChat()}>Iniciar Chat</Dropdown.Item>
    </UserLinkButton>
  );
}

export default UserLink