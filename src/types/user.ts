export type UserProps = {
  uid: string;
  name: string;
}

export type TUserProvider = {
  children: React.ReactNode;
}

export type TUserContext = {
  user: UserProps;
  changeName: any;
  searchUsers: any;
}

export const initialUser = { uid: '', name: '' }