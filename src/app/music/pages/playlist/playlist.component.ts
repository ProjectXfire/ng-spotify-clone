import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITrack, type IList } from '@core/interfaces';
// Services
import { MessageService } from 'primeng/api';
import { MediaPlayerService, StoreService } from '@app/music/services';
// Components
import { PlaylistHeaderComponent, TableTracksComponent } from '@app/music/components';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [PlaylistHeaderComponent, TableTracksComponent],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent implements OnInit {
  constructor(
    public storeService: StoreService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private mediaPlayer: MediaPlayerService
  ) {}

  playlist?: IList | null = null;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const { id } = params;
      this.playlist = this.storeService.getPlaylistById(id);
    });
  }

  onPlayPlaylist(): void {
    if (!this.playlist) return;
    this.mediaPlayer.onStartPlaylist({
      index: 0,
      length: this.playlist.songs.length,
      songs: this.playlist.songs
    });
  }

  onPlay(track: ITrack) {
    this.mediaPlayer.setSelectedTrack = { track, isPlaylist: true };
  }

  onDelete(songId: number): void {
    if (!this.playlist) return;
    const { data, error, successfulMessage } = this.storeService.removeSongFromPlaylist(
      this.playlist.id,
      songId
    );
    if (successfulMessage)
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: successfulMessage
      });
    if (error) this.messageService.add({ severity: 'info', summary: 'Info', detail: error });
    this.playlist = data;
  }
}
