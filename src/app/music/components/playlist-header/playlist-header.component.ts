import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService, type MenuItem } from 'primeng/api';
import { type IList } from '@core/interfaces';
// Services
import { SessionService } from '@core/services';
// Components
import { ButtonModule } from 'primeng/button';
import { DialogContainerComponent, MenuComponent } from '@shared/components';
import { UpdateNamePlaylistComponent } from '../update-name-playlist/update-name-playlist.component';
import { StoreService } from '@app/music/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist-header',
  standalone: true,
  imports: [ButtonModule, MenuComponent, UpdateNamePlaylistComponent, DialogContainerComponent],
  templateUrl: './playlist-header.component.html',
  styleUrl: './playlist-header.component.css'
})
export class PlaylistHeaderComponent implements OnInit {
  constructor(
    private sessionService: SessionService,
    private storeService: StoreService,
    private messageService: MessageService,
    private router: Router
  ) {}

  @Input() cover? = '';
  @Input() name? = '';
  @Input() playlistId? = '';
  @Input() songsLength? = 0;
  @Input() showMenu?: boolean = false;
  @Output() playPlaylist = new EventEmitter();
  @Output() delete = new EventEmitter();
  username?: string | null = '';
  isOpenUpdatePlaylistDialog: boolean = false;

  items: MenuItem[] = [
    {
      icon: 'pi pi-file-edit',
      label: 'Rename playlist',
      command: () => {
        this.isOpenUpdatePlaylistDialog = true;
      }
    },
    {
      icon: 'pi pi-trash',
      label: 'Delete playlist',
      command: () => {
        this.onDeletePlaylist();
      }
    }
  ];

  ngOnInit(): void {
    this.username = this.sessionService.session?.displayName;
  }

  onPlay() {
    this.playPlaylist.emit();
  }

  onUpdatePLaylistName(data: IList) {
    this.name = data.name;
  }

  onCloseUpdatePLaylistName() {
    this.isOpenUpdatePlaylistDialog = false;
  }

  onHideUpdatePLaylistName() {
    this.isOpenUpdatePlaylistDialog = false;
  }

  onDeletePlaylist() {
    if (!this.playlistId) return;
    const { error, successfulMessage } = this.storeService.removePlaylist(this.playlistId);
    if (successfulMessage) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: successfulMessage
      });
      this.router.navigate(['/']);
    }
    if (error) this.messageService.add({ severity: 'info', summary: 'Info', detail: error });
  }
}
