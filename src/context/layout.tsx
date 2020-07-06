import React, { useState } from 'react'

type LayoutContextProps = {
  openSidebar: boolean;
  chatTitle: string;
  changeChatTitle: any;
  changeSidebarState: any;
}

const LayoutContext = React.createContext<LayoutContextProps>({
  openSidebar: false,
  chatTitle: '',
  changeChatTitle: () => {},
  changeSidebarState: () => {}
})

type LayoutProviderProps = {
  children: React.ReactNode;
}

function LayoutProvider ({ children } : LayoutProviderProps) {
  const [openSidebar, setSidebar] = useState<boolean>(false)
  const [chatTitle, setChatTitle] = useState<string>('')

  const changeChatTitle = (title : string) => setChatTitle(title)

  const changeSidebarState = (state : boolean) => setSidebar(state)

  return (
    <LayoutContext.Provider
      value={{
        openSidebar,
        chatTitle,
        changeChatTitle,
        changeSidebarState 
      }}
      children={children}
    />
  )
}

function useLayout() {
  const context = React.useContext(LayoutContext)
  if (context === undefined) {
    throw new Error(`useLayout must be used within a LayoutProvider`)
  }
  return context
}

export { LayoutProvider, useLayout }
