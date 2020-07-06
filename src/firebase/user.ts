import { db } from './config'
import { generateID } from '../utils/idGenerator'
import { UserProps } from '../types/user'

export const signInAnom = async () => {
  const uid = generateID()
  const data = {
    uid,
    name: `Anonymous-${uid}`
  }
  
  return db.ref('users/' + data.uid).set({ name: data.name }).then(() => {
    return { type: 'CREATE_USER', payload: data }
  })
}

export const updateDisplayName = async ({ uid, name }: UserProps) => {
  return db.ref('users/' + uid).update({ name }).then(() => {
    return { type: 'CHANGE_NAME', payload: name }
  })
}

export const getDisplayName = async (userId: string) => {
  return db.ref('users').child(userId).once('value').then((snapshot : any) => {
    const user = snapshot.val()
    return user.name
  })
}

export const searchUsersByValue = async (searchValue : string) => {
  return db.ref('users').orderByChild('name')
    .startAt(searchValue)
    .endAt(searchValue+"\uf8ff")
    .once('value')
    .then((snapshot : any) => {
      const getUsers = snapshot.val()
      const userList : UserProps[] = []

      for (let user in getUsers){
        userList.push({
          uid: user,
          name: getUsers[user].name
        })
      }

      return userList
    })
}