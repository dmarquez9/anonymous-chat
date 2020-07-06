import React, { useState } from 'react'
import {
  Navbar as BNavbar,
  Nav,
  NavDropdown
} from 'react-bootstrap'

import { useUser } from '../../context/user'
import NickModal from '../NickModal'
import { useLayout } from '../../context/layout'

function Navbar () {
  const { user } = useUser()
  const { chatTitle, changeSidebarState } = useLayout()
  const [show, setShowModal] = useState(false)

  return (
    <> 
      <BNavbar bg="primary" variant="dark">
        <BNavbar.Toggle
          aria-controls="basic-navbar-nav"
          className="d-flex d-lg-none"
          onClick={() => changeSidebarState(true)}
        />
        <BNavbar.Brand>{chatTitle}</BNavbar.Brand>
        <Nav className="ml-auto">
          <NavDropdown title={user.name} id="user-nav-dropdown" alignRight>
            <NavDropdown.Item href="#" onClick={() => setShowModal(true)}>Cambiar el nick</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </BNavbar>
      <NickModal show={show} setShowModal={setShowModal} />
    </>
  );
}

export default Navbar
