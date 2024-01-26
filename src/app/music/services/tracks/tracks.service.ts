import { Injectable, signal } from '@angular/core';
import { type IResponse, type ITrack } from '@core/interfaces';
import { data } from '@shared/mock/track.json';

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  constructor() {}

  private callApiGetTracks(): Promise<ITrack[]> {
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  }

  private callApiSearchTracks(searchTerm: string): Promise<ITrack[]> {
    return new Promise((resolve, reject) => {
      const filterData = data.filter(
        (track) =>
          track.album.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
          track.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
          track.artist.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
      );
      resolve(filterData);
    });
  }

  async getTracks(): Promise<IResponse<ITrack[]>> {
    try {
      const data = await this.callApiGetTracks();
      return {
        data,
        error: null,
        successfulMessage: 'Tracks successfully loaded'
      };
    } catch (error: any) {
      return {
        data: [],
        error: error.message,
        successfulMessage: null
      };
    }
  }

  async searchTracks(searchTerm: string): Promise<IResponse<ITrack[]>> {
    try {
      const data = await this.callApiSearchTracks(searchTerm);
      return {
        data,
        error: null,
        successfulMessage: 'Tracks successfully found'
      };
    } catch (error: any) {
      return {
        data: [],
        error: error.message,
        successfulMessage: null
      };
    }
  }
}
