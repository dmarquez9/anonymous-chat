import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { ChatMessagesProps } from '../../types/chatMessages'

import DeleteMessage from './DeleteMessage'

type BubbleContainerProps = {
  right: Boolean;
}

const BubbleContainer = styled.div`
  display: block;
  margin-top: 1rem;
  
  ${({ right }:BubbleContainerProps) => right && css`
      text-align: right;
  `};
`

const BubbleBox = styled.div`
  max-width: 40%;
  padding: 8px;
  background-color: #313131;
  border-radius: 4px;
  color: #fff;
  width: auto;
  display: inline-block;
  cursor: pointer;

  @media (max-width: 767px) {
    max-width: 80%;
  }
`
const BubbleAuthor = styled.small`
  display: block;
`
type BubbleProps = {
  data: ChatMessagesProps;
  isUserAuthor: Boolean;
}

function Bubble ({ data, isUserAuthor }: BubbleProps) {
  const [showDeleteModal, setDeleteModal] = useState<boolean>(false)

  const handleDelete = () =>{
    if (isUserAuthor) {
      setDeleteModal(true)
    }
  }

  return (
    <BubbleContainer right={isUserAuthor}>
      <BubbleAuthor>{data.author}</BubbleAuthor>
      <BubbleBox onClick={() => handleDelete()}>{data.content}</BubbleBox>
      {isUserAuthor && 
        <DeleteMessage
          show={showDeleteModal}
          hideModal={() => setDeleteModal(false)}
          messageId={data.uid}
          chatId={data.chatId}
        />
      }
    </BubbleContainer>
  );
}

export default Bubble
