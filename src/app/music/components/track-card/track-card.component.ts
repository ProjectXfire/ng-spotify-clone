import { Component, Input } from '@angular/core';
import { type ITrack } from '@core/interfaces';
// Services
import { MediaPlayerService, StoreService } from '@app/music/services';
// Components
import { type Menu, MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { PlaylistDialogComponent } from '../playlist-dialog/playlist-dialog.component';

type TTypeCard = 'horizontal' | 'vertical';

@Component({
  selector: 'app-track-card',
  standalone: true,
  imports: [ButtonModule, MenuModule, DialogModule, PlaylistDialogComponent],
  templateUrl: './track-card.component.html',
  styleUrl: './track-card.component.css'
})
export class TrackCardComponent {
  constructor(
    private mediaPlayerService: MediaPlayerService,
    private storeService: StoreService,
    private messageService: MessageService
  ) {}

  @Input() track: ITrack | null = null;
  @Input() cartType: TTypeCard = 'vertical';
  trackSelected: ITrack | null = null;
  isOpenAddToPlaylistDialog = false;

  items: MenuItem[] = [
    {
      icon: 'pi pi-list',
      label: 'Add to playlist',
      command: () => {
        this.isOpenAddToPlaylistDialog = true;
      }
    },
    {
      icon: 'pi pi-heart',
      label: 'Add to favorites',
      command: () => {
        const { error, successfulMessage } = this.storeService.addSongToFavorites(this.track!);
        if (error) this.messageService.add({ severity: 'info', summary: 'Info', detail: error });
        if (successfulMessage)
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: successfulMessage
          });
      }
    }
  ];

  onPlayTrack() {
    this.mediaPlayerService.setSelectedTrack = { track: this.track!, isPlaylist: false };
  }

  onHideMenu(): void {
    this.trackSelected = null;
  }

  onCloseMenu(): void {
    this.isOpenAddToPlaylistDialog = false;
  }

  onOpenMenu(track: ITrack, event: Event, menu: Menu): void {
    this.trackSelected = track;
    menu.toggle(event);
  }
}
