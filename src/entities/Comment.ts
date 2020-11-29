import IUser from './User';

export interface IComment {
  id: string;
  user_id: string;
  user: IUser;
  complaint_id: string;
  content: string;
  date: Date;
}
