import { Component } from '@angular/core';
import { type ITrack } from '@core/interfaces';
// Services
import { MediaPlayerService, TracksService } from '@app/music/services';
// Components
import { TableTracksComponent } from '@app/music/components';
import { InputSearchComponent } from '@shared/components';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [InputSearchComponent, TableTracksComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor(
    private tracksService: TracksService,
    private mediaPlayer: MediaPlayerService
  ) {}

  tracks: ITrack[] = [];

  value: string = '';

  async onGetTracks(): Promise<void> {
    const { data } = await this.tracksService.getTracks();
    this.tracks = data;
  }

  async onSearch(value: string) {
    const { data } = await this.tracksService.searchTracks(value);
    this.tracks = data;
  }

  onPlay(track: ITrack) {
    this.mediaPlayer.setSelectedTrack = { track, isPlaylist: false };
  }
}
