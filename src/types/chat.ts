export type ChatProps = {
  uid: string;
  title: string;
}
export type ChatContextProps = {
  chats: ChatProps[];
  createNewChat: any
}

export const initialChat = {
  chats: [],
  createNewChat: () => {}
}

export type NewChatProps = {
  userId: string;
  chatWithId: string;
}
