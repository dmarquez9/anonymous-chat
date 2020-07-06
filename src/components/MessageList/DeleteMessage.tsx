import React from 'react'
import {
  Button, Modal
} from 'react-bootstrap'

import { useChatMessages } from '../../context/chatMessages'

type TDeleteMessage = {
  hideModal: any;
  show: boolean;
  chatId: string;
  messageId: string;
}

function DeleteMessage ({ show, hideModal, chatId, messageId } : TDeleteMessage) {
  const { deleteMessage } = useChatMessages()

  const onSubmit = async () => {
    await deleteMessage({ chatId, messageId })
    hideModal()
  }

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={hideModal}>
        <Modal.Title>Eliminar mensaje</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Cerrar
        </Button>
        <Button variant="danger" onClick={onSubmit}>
          Borrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteMessage