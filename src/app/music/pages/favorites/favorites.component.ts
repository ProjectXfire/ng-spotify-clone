import { Component, OnInit } from '@angular/core';
import { type ITrack } from '@core/interfaces';
// Services
import { MessageService } from 'primeng/api';
import { MediaPlayerService, StoreService } from '@app/music/services';
// Components
import { PlaylistHeaderComponent, TableTracksComponent } from '@app/music/components';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [PlaylistHeaderComponent, TableTracksComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  constructor(
    public storeService: StoreService,
    private mediaPlayer: MediaPlayerService,
    private messageService: MessageService
  ) {}

  favoritesSongs: ITrack[] = [];

  ngOnInit(): void {
    this.favoritesSongs = this.storeService.getFavoritesSongs;
  }

  onPlayPlaylist(): void {
    if (this.favoritesSongs.length === 0) return;
    this.mediaPlayer.onStartPlaylist({
      index: 0,
      length: this.favoritesSongs.length,
      songs: this.favoritesSongs
    });
  }

  onPlay(track: ITrack) {
    this.mediaPlayer.setSelectedTrack = { track, isPlaylist: true };
  }

  onDelete(songId: number): void {
    const { data, error, successfulMessage } = this.storeService.removeSongFromFavorites(songId);
    if (successfulMessage)
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: successfulMessage
      });
    if (error) this.messageService.add({ severity: 'info', summary: 'Info', detail: error });
    this.favoritesSongs = data;
  }
}
