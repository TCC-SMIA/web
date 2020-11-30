export enum UserTypes {
  Reporter = 'Reporter',
  EnvironmentalAgency = 'EnvironmentalAgency',
}

export default interface IUser {
  id: string;
  name: string;
  nickname: string;
  email: string;
  avatar: string;
  avatar_url: string;
  type: UserTypes;
}
