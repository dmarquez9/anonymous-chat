import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import ChatItem from './ChatItem'
import DividerTitle from './DividerTitle'
import CategoryModal from '../CategoryModal'
import NewChatModal from '../NewChatModal'

import { useCategory } from '../../context/category'
import { useChat } from '../../context/chat'

const SidebarLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: #2a2a2a;
  padding: 15px;
`

const Logo = styled(Link)`
  font-weight: bold;
  letter-spacing: 2px;
  color: #fff;
  margin-bottom: 1rem;
  font-size: 2rem;

  &:hover, &:focus {
    text-decoration: none;
    color: #f9f9f9
  }
`

const NoChats = styled.h4`
  color: #fff;
  font-size: 1rem;
  font-size: 300;
  text-align: center;
  margin-top: 1rem;
`

function Sidebar () {
  const { categories } = useCategory()
  const { chats } = useChat()
  const [showCategoryModal, setCategoryModal] = useState(false)
  const [showNewChatModal, setNewChatModal] = useState(false)

  return (
    <SidebarLayout>
      <Logo to="/">Chat</Logo>
      {categories.length && <DividerTitle title="Categorias" onBtnClick={() => setCategoryModal(true)} />}
      {categories.map((category : any) => (
        <ChatItem key={category.uid} category={true} data={category} />
      ))}
      <DividerTitle title="Chats" onBtnClick={() => setNewChatModal(true)} />
      {chats.length === 0 && <NoChats>Inicia un chat con otra persona.</NoChats>}
      {chats.map((chat : any) => (
        <ChatItem key={chat.uid} data={chat} />
      ))}
      <CategoryModal show={showCategoryModal} hideModal={() => setCategoryModal(false)} />
      <NewChatModal show={showNewChatModal} hideModal={() => setNewChatModal(false)} />
    </SidebarLayout>
  );
}

export default Sidebar
