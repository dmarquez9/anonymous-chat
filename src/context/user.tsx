import React, { useReducer, useEffect } from 'react'
import { updateDisplayName, signInAnom, searchUsersByValue } from '../firebase/user'
import { initialUser, UserProps , TUserProvider, TUserContext } from '../types/user'

const UserContext = React.createContext<TUserContext>({
  user: initialUser,
  changeName: () => {},
  searchUsers: () => {}
})

function UserReducer (state: UserProps, action: any) {
  switch (action.type) {
    case 'CREATE_USER':
      return { ...action.payload }
    case 'CHANGE_NAME':
      return { ...state, name: action.payload };
    default:
      return initialUser
  }
}

function UserProvider ({ children } : TUserProvider) {
  const [state, dispatch] = useReducer(UserReducer, initialUser)

  useEffect(() => {
    const login = async () => {
      const anonymous = await signInAnom()
      dispatch(anonymous)
    }

    login()
  }, [])

  const changeName = async (name: string) => {
    const newName = await updateDisplayName({ uid: state.uid, name }) 
    dispatch(newName)
  }

  const searchUsers = async (search : string) => await searchUsersByValue(search)

  return <UserContext.Provider value={{ user: state, changeName, searchUsers }} children={children} />
}

function useUser() {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`)
  }
  return context
}

export { UserProvider, useUser }
