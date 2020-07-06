import React from 'react'
import { UserProvider } from './user'
type TAppProviders = {
  children: React.ReactNode;
}

function AppProviders ({ children } : TAppProviders) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  )
}

export default AppProviders
