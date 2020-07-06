import React from 'react'
import { UserProvider } from './user'
import { LayoutProvider } from './layout'

type TAppProviders = {
  children: React.ReactNode;
}

function AppProviders ({ children } : TAppProviders) {
  return (
    <LayoutProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </LayoutProvider>
  )
}

export default AppProviders
