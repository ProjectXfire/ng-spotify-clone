import { Injectable, signal } from '@angular/core';
import { IResponse, type ITrack } from '@core/interfaces';
import type { IList, IStore } from '@core/interfaces/IStore';
import { mySongs, mylist } from '@shared/mock/list';

type ITCreatePlaylistDto = {
  name: string;
  description: string;
};

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor() {}

  private store = signal<IStore>({
    myLists: [...mylist],
    myFavorites: [...mySongs],
    selectedList: null
  });

  get getPlaylists(): IList[] {
    return this.store().myLists;
  }

  get getSelectedPlaylist(): IList | null {
    return this.store().selectedList;
  }

  get getFavoritesSongs(): ITrack[] {
    return this.store().myFavorites;
  }

  getPlaylistById(id: string) {
    return this.store().myLists.find((list) => list.id === id);
  }

  createPlaylist(payload: ITCreatePlaylistDto) {
    const { name, description } = payload;
    const newPlaylist: IList = {
      id: new Date().getTime().toString(),
      name,
      description,
      songs: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.store.set({ ...this.store(), myLists: [...this.store().myLists, newPlaylist] });
  }

  renamePlaylist(playlistId: string, newName: string): IResponse<IList | null> {
    const playlist = this.store().myLists.find((list) => list.id === playlistId);
    if (!playlist) return { data: null, error: 'No playlist found', successfulMessage: null };
    playlist.name = newName;
    const updatedPlaylists = this.store().myLists.map((list) =>
      list.id === playlistId ? playlist : list
    );
    this.store.set({ ...this.store(), myLists: updatedPlaylists });
    return {
      data: playlist,
      error: null,
      successfulMessage: `Playlist '${playlist.name}' has been renamed to '${newName}'`
    };
  }

  removePlaylist(playlistId: string): IResponse<IList[]> {
    const playlist = this.store().myLists.find((list) => list.id === playlistId);
    if (!playlist)
      return { data: this.store().myLists, error: 'No playlist found', successfulMessage: null };
    const updatedPlaylists = this.store().myLists.filter((list) => list.id !== playlistId);
    this.store.set({ ...this.store(), myLists: updatedPlaylists });
    return {
      data: updatedPlaylists,
      error: null,
      successfulMessage: `Playlist '${playlist.name}' has been removed`
    };
  }

  addSongToPlaylist(playlistId: string, track: ITrack): IResponse<null> {
    const playlist = this.store().myLists.find((list) => list.id === playlistId);
    if (!playlist) return { data: null, error: 'No playlist found', successfulMessage: null };
    const existSong = playlist.songs.find((song) => song._id === track._id);
    if (existSong)
      return { data: null, error: 'Song already in playlist', successfulMessage: null };
    const updatedPlaylists = this.store().myLists.map((list) =>
      list.id === playlistId ? { ...list, songs: [...list.songs, track] } : list
    );
    this.store.set({ ...this.store(), myLists: updatedPlaylists });
    return {
      data: null,
      error: null,
      successfulMessage: `Song '${track.name}' has been added to playlist '${playlist.name}'`
    };
  }

  removeSongFromPlaylist(playlistId: string, songId: number): IResponse<IList | null> {
    const playlist = this.store().myLists.find((list) => list.id === playlistId);
    if (!playlist) return { data: null, error: 'No playlist found', successfulMessage: null };
    const existSong = playlist.songs.find((song) => song._id === songId);
    if (!existSong)
      return { data: null, error: 'Song does not exist in playlist', successfulMessage: null };
    const updatedPlaylist = this.store().myLists.map((list) =>
      list.id === playlistId
        ? { ...list, songs: list.songs.filter((song) => song._id !== songId) }
        : list
    );
    this.store.set({ ...this.store(), myLists: updatedPlaylist });
    const updatedSongs = playlist.songs.filter((song) => song._id !== songId);
    playlist.songs = updatedSongs;
    return {
      data: structuredClone(playlist),
      error: null,
      successfulMessage: `Song removed from playlist`
    };
  }

  addSongToFavorites(track: ITrack): IResponse<null> {
    const song = this.store().myFavorites.find((song) => song._id === track._id);
    if (song)
      return {
        data: null,
        error: `Song '${track.name}' already in favorites`,
        successfulMessage: null
      };
    this.store.set({ ...this.store(), myFavorites: [...this.store().myFavorites, track] });
    return {
      data: null,
      error: null,
      successfulMessage: `Song '${track.name}' has been added to your favorites`
    };
  }

  removeSongFromFavorites(songId: number): IResponse<ITrack[]> {
    const song = this.store().myFavorites.find((song) => song._id === songId);
    if (!song) return { data: [], error: 'No song found', successfulMessage: null };
    const updatedSongs = this.store().myFavorites.filter((song) => song._id !== songId);
    this.store.set({ ...this.store(), myFavorites: updatedSongs });
    return {
      data: updatedSongs,
      error: null,
      successfulMessage: 'Song removed from favorites'
    };
  }
}
