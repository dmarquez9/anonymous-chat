export type ChatMessagesProps = {
  uid: string;
  content: string;
  userId: string;
  chatId: string;
  author: string;
  date: string;
  time: string;
  deleted: boolean;
}

export type NewMessageProps = {
  chatId: string;
  userId: string;
  message: string;
}

export type DeleteMessageProps = {
  chatId: string;
  messageId: string;
}

export type ChatMessagesContextProps = {
  deleteMessage: any;
  messages: ChatMessagesProps[];
}

export const initalChatMessagesContext = {
  deleteMessage: () => {},
  messages: []
}