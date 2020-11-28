import { IComment } from './Comment';
import IUser from './User';

export enum ComplaintStatusEnum {
  New = 'Nova denúncia',
  InProgress = 'Em progresso',
  Resolved = 'Resolvida',
}

export enum ComplaintTypeEnum {
  Others = 'Outros',
  StrandingOfMarineAnimals = 'Encalhe de animais marinhos',
  WildAnimalsOutOfTheirHabitat = 'Animais selvagens fora de seu habitat',
  IrregularDeforestation = 'Desmatamento Irregular',
  IrregularDumpingOfGarbage = 'Despejo irregular de lixo',
  IllegalHunting = 'Caça ilegal',
  Fire = 'Incêndio',
  MistreatmentOfAnimals = 'Maus tratos a animais',
}

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
  status: string;
  type: string;
  user: IUser;
  user_id?: string;
  comments: IComment[];
}
