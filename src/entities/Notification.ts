import IUser from './User';

export default interface INotification {
  id: string;
  content: string;
  user: IUser;
  read: boolean;
}
