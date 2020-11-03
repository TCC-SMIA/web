import IUser from './User';

export default interface IMessage {
  id: string;
  content: string;
  user_id: string;
  user: IUser;
  chat_id: string;
}
