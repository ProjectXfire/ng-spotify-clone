import { ITrack } from './ITrack';

export interface IStore {
  myLists: IList[];
  myFavorites: ITrack[];
  selectedList: IList | null;
}

export interface IList {
  id: string;
  name: string;
  description: string;
  cover?: string;
  createdAt: Date;
  updatedAt: Date;
  songs: ITrack[];
}
