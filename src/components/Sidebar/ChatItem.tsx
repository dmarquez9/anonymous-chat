import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { CategoryProps } from '../../types/category'

type ChatProps = {
  category?: boolean;
  data: CategoryProps;
}

const ChatLink = styled(Link)`
  color: #fff;
  margin-bottom: .5rem;
  font-size: 1rem;
  position: relative;
  padding-left: 20px;

  &:hover, &:focus {
    text-decoration: none;
    color: #f9f9f9
  }

  &:before {
    content: '#';
    position: absolute;
    color: #666;
    left: 0;
    font-weight: 100;
  }
`

function ChatItem ({ category, data }: ChatProps) {
  const link = category ? `/category/${data.uid}` : `/chat/${data.uid}`
  return (
    <ChatLink key={data.uid} to={link}>{data.title}</ChatLink>
  );
}

export default ChatItem
