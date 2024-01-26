import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type ITrack } from '@core/interfaces';
// Services
import { StoreService } from '@app/music/services';
// Components
import { MessageService } from 'primeng/api';
import { MessageComponent } from '@shared/components';

@Component({
  selector: 'app-playlist-dialog',
  standalone: true,
  imports: [MessageComponent],
  templateUrl: './playlist-dialog.component.html',
  styleUrl: './playlist-dialog.component.css'
})
export class PlaylistDialogComponent {
  constructor(
    public storeService: StoreService,
    private messageService: MessageService
  ) {}

  @Input() track: null | ITrack = null;
  @Output() close = new EventEmitter();

  onAddSongToPlaylist(playlistId: string) {
    if (this.track) {
      const { error, successfulMessage } = this.storeService.addSongToPlaylist(
        playlistId,
        this.track
      );
      if (successfulMessage)
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: successfulMessage
        });
      if (error) this.messageService.add({ severity: 'info', summary: 'Info', detail: error });
    }
    this.close.emit();
  }
}
