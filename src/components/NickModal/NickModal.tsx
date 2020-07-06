import React, { useState, useEffect } from 'react'
import {
  Button, Modal, Alert, Form
} from 'react-bootstrap'

import { useUser } from '../../context/user'

type TNickModal = {
  setShowModal: any;
  show: boolean;
}

function NickModal ({ show, setShowModal } : TNickModal) {
  const [nickname, setNick] = useState('')
  const [message, setMessage] = useState('')
  const { changeName } = useUser()

  useEffect(() => setMessage(''), [show])

  const onSubmit = async () => {
    if (nickname) {
      await changeName(nickname)
      setShowModal(false)
    } else {
      setMessage('Ingresa un nickname')
    }
  }

  const onHide = () => setShowModal(false)

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>Cambia tu nick</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <Alert variant="danger">{message}</Alert>}
        <Form.Control
          type="text"
          placeholder="John Doe"
          value={nickname}
          onChange={(event : any) => setNick(event?.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NickModal