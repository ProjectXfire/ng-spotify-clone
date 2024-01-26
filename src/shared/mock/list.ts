import { ITrack } from '@core/interfaces';
import { IList } from '@core/interfaces/IStore';

export const mylist: IList[] = [
  {
    id: 'lkd983hda',
    name: 'Rock and Pop',
    description: 'My top of music',
    songs: [],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '983klasd',
    name: 'Electronic',
    description: 'Best electronic music',
    songs: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const mySongs: ITrack[] = [
  {
    _id: 1,
    name: 'Moonlit Walk',
    album: 'Chill Lo-Fi Music',
    cover:
      'https://vinyl.lofirecords.com/cdn/shop/products/VINYL_MORNING_COFFEE_4-min.png?v=1680526353',
    artist: {
      name: 'LoFi Dreamer',
      nickname: 'LoFi Dreamer',
      nationality: 'FR'
    },
    url: '/assets/tracks/01.mp3'
  },
  {
    _id: 2,
    name: 'Coffee Daze',
    album: 'Midnight Tales',
    cover: 'https://vinyl.lofirecords.com/cdn/shop/files/2amsynth-vinyl.png?v=1693312187',
    artist: {
      name: 'Urban Nocturne',
      nickname: 'Urban Nocturne',
      nationality: 'US'
    },
    url: '/assets/tracks/02.mp3'
  }
];
