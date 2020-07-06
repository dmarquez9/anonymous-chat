import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Sidebar from './Sidebar'
import ChatBody from './ChatBody'

import SidebarProviders from '../context/sidebarProvider'

const Layout = styled.div`
  display: flex;
  height: 100vh;
`

function App() {
  return (
    <Router>
      <Layout>
        <SidebarProviders>
          <Sidebar />
        </SidebarProviders>
        <ChatBody />
      </Layout>
    </Router>
  );
}

export default App;
