import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type ITrack } from '@core/interfaces';
import { MessageService, type MenuItem } from 'primeng/api';
// Services
import { StoreService } from '@app/music/services';
// Components
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PlaylistDialogComponent } from '..';
import { DialogContainerComponent, MenuComponent } from '@shared/components';

@Component({
  selector: 'app-table-tracks',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    PlaylistDialogComponent,
    MenuComponent,
    DialogContainerComponent
  ],
  templateUrl: './table-tracks.component.html',
  styleUrl: './table-tracks.component.css'
})
export class TableTracksComponent {
  constructor(
    private storeService: StoreService,
    private messageService: MessageService
  ) {}

  @Input() tracks: ITrack[] = [];
  @Input() tracklistOptions: boolean = false;
  @Output() delete = new EventEmitter<number>();
  @Output() play = new EventEmitter<ITrack>();
  isOpenAddToPlaylistDialog = false;
  trackSelected: ITrack | null = null;

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
        const { error, successfulMessage } = this.storeService.addSongToFavorites(
          this.trackSelected!
        );
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

  itemsPlaylist: MenuItem[] = [
    ...this.items,
    {
      icon: 'pi pi-trash',
      label: 'Remove from playlist',
      command: () => {
        this.isOpenAddToPlaylistDialog = false;
        if (this.trackSelected) this.delete.emit(this.trackSelected._id);
      }
    }
  ];

  onPlay(track: ITrack) {
    this.play.emit(track);
  }

  onHideMenu(): void {
    this.isOpenAddToPlaylistDialog = false;
    this.trackSelected = null;
  }

  onCloseMenu(): void {
    this.isOpenAddToPlaylistDialog = false;
  }

  setTrack(track: ITrack) {
    this.trackSelected = track;
  }
}
