import React, { useState, useEffect } from 'react'
import {
  Button, Modal, Alert, Form, Spinner
} from 'react-bootstrap'
import styled from 'styled-components'

import { useUser } from '../../context/user'

import UserLink from './UserLink'

type TNewChatModal = {
  hideModal: any;
  show: boolean;
}

const UserList = styled.div`
  overflow-y: auto;
  height: 200px;
  margin-top: 1rem;
`  

function NewChatModal ({ show, hideModal } : TNewChatModal) {
  const [search, setSearch] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [userList, setUserList]  = useState([])
  const { searchUsers } = useUser()

  useEffect(() => setMessage(''), [show])

  const onSubmit = async () => {
    if (search && search.length > 2) {
      setLoading(true)
      const getUsers = await searchUsers(search)
      setUserList(getUsers)
      setLoading(false)
    } else {
      setMessage('Ingresa un nombre de usuario')
    }
  }

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={hideModal}>
        <Modal.Title>Iniciar un nuevo chat</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <Alert variant="danger">{message}</Alert>}
        <Form.Control
          type="text"
          placeholder="Buscar usuario por nombre..."
          value={search}
          onChange={(event : any) => setSearch(event?.target.value)}
        />
        {loading && <Spinner animation="border" />}
        <UserList>
          {userList.map((user : any) => (
            <UserLink key={`link-${user.uid}`} data={user} hideModal={hideModal} />
          ))}
        </UserList>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={onSubmit} disabled={search.length < 3}>
          Buscar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewChatModal