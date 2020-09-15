export default interface IAgency {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  latitude: number;
  longitude: number;
  user_type: number;
  avatar_url?: string;
  nickname?: string;
}
