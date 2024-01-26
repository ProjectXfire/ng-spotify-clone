import { Component, OnInit } from '@angular/core';
import { type IList } from '@core/interfaces/IStore';
import { MessageService, type MenuItem } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
// Services
import { StoreService } from '@app/music/services';
import { SessionService } from '@core/services';
// Components
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuComponent } from '@shared/components';
import { UpdateNamePlaylistComponent } from '..';
import { DialogContainerComponent } from '@shared/components';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    RouterModule,
    MenuModule,
    ButtonModule,
    MenuComponent,
    DialogContainerComponent,
    UpdateNamePlaylistComponent
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private sessionService: SessionService,
    private router: Router,
    private messageService: MessageService
  ) {}

  myPlaylists: IList[] = [];
  username?: string | null = '';
  playlistSelectedId: string = '';
  playlistSelectedName: string = '';
  isOpenUpdatePlaylistDialog: boolean = false;
  items: MenuItem[] = [
    {
      icon: 'pi pi-file-edit',
      label: 'Rename playlist',
      command: (e) => {
        e.originalEvent?.stopPropagation();
        this.isOpenUpdatePlaylistDialog = true;
      }
    },
    {
      icon: 'pi pi-trash',
      label: 'Delete playlist',
      command: (e) => {
        e.originalEvent?.stopPropagation();
        this.onRemovePlaylist();
      }
    }
  ];

  ngOnInit(): void {
    this.myPlaylists = this.storeService.getPlaylists;
    this.username = this.sessionService.session?.displayName;
  }

  onSelectPlaylist(id: string) {
    this.router.navigate([`/playlist/${id}`]);
  }

  onRemovePlaylist() {
    if (!this.playlistSelectedId) return;
    const { error, successfulMessage, data } = this.storeService.removePlaylist(
      this.playlistSelectedId
    );
    if (successfulMessage) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: successfulMessage
      });
      this.myPlaylists = data;
    }
    if (error) this.messageService.add({ severity: 'info', summary: 'Info', detail: error });
  }

  clearValues() {
    this.isOpenUpdatePlaylistDialog = false;
    this.playlistSelectedId = '';
    this.playlistSelectedName = '';
  }

  onUpdatePLaylistName(data: IList) {
    const playlists = this.myPlaylists.map((list) => (list.id === data.id ? data : list));
    this.myPlaylists = playlists;
  }

  onCloseUpdatePLaylistName() {
    this.clearValues();
  }

  onHideUpdatePLaylistName() {
    this.clearValues();
  }

  onOpenMenu(playlistId: string, playlistName: string): void {
    this.playlistSelectedId = playlistId;
    this.playlistSelectedName = playlistName;
  }
}
