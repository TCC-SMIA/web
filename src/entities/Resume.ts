import IUser from './User';

export default interface IResume {
  user: IUser;
  complaints_reported: number;
  complaints_in_progress: number;
  complaints_resolved: number;
}
