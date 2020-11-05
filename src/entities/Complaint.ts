import { IComment } from './Comment';
import IUser from './User';

export default interface IComplaint {
  id: string;
  resolved: boolean;
  image_url: string;
  title: string;
  description: string;
  date: Date;
  latitude: number;
  longitude: number;
  anonymous: boolean;
  city: string;
  state: string;
  user: IUser;
  user_id?: string;
  comments: IComment[];
}
