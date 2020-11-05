import IUser from './User';
import IAgency from './Agency';

export interface IComment {
  id: string;
  user_id: string;
  user: IUser;
  agency_id: string;
  agency: IAgency;
  content: string;
  date: Date;
}
