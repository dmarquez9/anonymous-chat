import React, { useState } from 'react'
import {
  Navbar as BNavbar,
  Nav,
  NavDropdown
} from 'react-bootstrap'

import { useUser } from '../../context/user'
import NickModal from '../NickModal'

function Navbar () {
  const { user } = useUser()
  const [show, setShowModal] = useState(false)

  return (
    <> 
      <BNavbar bg="primary" variant="dark">
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
