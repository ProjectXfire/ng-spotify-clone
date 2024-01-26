export interface ITrack {
  _id: number;
  name: string;
  album: string;
  cover: string;
  artist: IArtist;
  url: string;
}

interface IArtist {
  name: string;
  nickname: string;
  nationality: string;
}
