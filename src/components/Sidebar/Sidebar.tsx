import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'

import ChatItem from './ChatItem'
import DividerTitle from './DividerTitle'
import CategoryModal from '../CategoryModal'
import NewChatModal from '../NewChatModal'

import { useCategory } from '../../context/category'
import { useChat } from '../../context/chat'
import { useLayout } from '../../context/layout'

type SidebarLayoutProps = {
  openSidebar: boolean;
}
const SidebarLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: #2a2a2a;
  padding: 15px;

  @media (max-width: 991px) {
    position: fixed;
    left: -300px;
    top: 0;
    height: 100vh;
    z-index: 9999;
    max-width: 100%;

    ${({ openSidebar }:SidebarLayoutProps) => openSidebar && css`
      left: 0;
  `};
  } 
`

const Logo = styled(Link)`
  font-weight: bold;
  letter-spacing: 2px;
  color: #fff;
  margin: 0;
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
  const { openSidebar, changeSidebarState } = useLayout()
  const [showCategoryModal, setCategoryModal] = useState(false)
  const [showNewChatModal, setNewChatModal] = useState(false)

  return (
    <SidebarLayout openSidebar={openSidebar}>
      <Row className="mb-4">
        <Col><Logo to="/">Chat</Logo></Col>
        <Col xs="auto" className="d-md-none">
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => changeSidebarState(false)}
          > 
            X
          </Button>
        </Col>
      </Row>
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
