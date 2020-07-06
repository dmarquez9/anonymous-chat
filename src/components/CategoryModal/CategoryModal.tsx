import React, { useState, useEffect } from 'react'
import {
  Button, Modal, Alert, Form
} from 'react-bootstrap'

import { useCategory } from '../../context/category'
import { generateID } from '../../utils/idGenerator'

type TCategoryModal = {
  hideModal: any;
  show: boolean;
}

function CategoryModal ({ show, hideModal } : TCategoryModal) {
  const [category, setCategory] = useState('')
  const [message, setMessage] = useState('')
  const { addCategory } = useCategory()

  useEffect(() => setMessage(''), [show])

  const onSubmit = async () => {
    if (category) {
      await addCategory({
        uid: generateID(`${category.toLowerCase()}-`),
        title: category
      })
      hideModal()
    } else {
      setMessage('Ingresa un nickname')
    }
  }

  return (
    <Modal show={show}>
      <Modal.Header closeButton onClick={hideModal}>
        <Modal.Title>Crear categoria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <Alert variant="danger">{message}</Alert>}
        <Form.Control
          type="text"
          placeholder="Ingresa el titulo para la categoria"
          value={category}
          onChange={(event : any) => setCategory(event?.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CategoryModal