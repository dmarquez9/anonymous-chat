import React from 'react'
import { CategoryProvider } from './category'
import { ChatProvider } from './chat'
import { useUser } from './user'

type TSidebarProviders = {
  children: React.ReactNode;
}

function SidebarProviders ({ children } : TSidebarProviders) {
  const { user } = useUser()

  return (
    <ChatProvider userId={user.uid}>
      <CategoryProvider>
        {children}
      </CategoryProvider>
    </ChatProvider>
  )
}

export default SidebarProviders
