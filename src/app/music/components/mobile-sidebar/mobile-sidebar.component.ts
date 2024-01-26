import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_NAME, homeRoutes } from '@shared/contants';
// Services
import { MobileSibebarService } from '@app/music/services';
import { DialogContainerComponent } from '@shared/components';
import { CreatePlaylistComponent } from '../create-playlist/create-playlist.component';
import { PlaylistsSidebarComponent } from '../playlists-sidebar/playlists-sidebar.component';

@Component({
  selector: 'app-mobile-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    DialogContainerComponent,
    CreatePlaylistComponent,
    PlaylistsSidebarComponent
  ],
  templateUrl: './mobile-sidebar.component.html',
  styleUrl: './mobile-sidebar.component.css'
})
export class MobileSidebarComponent {
  constructor(private mobileSidebarService: MobileSibebarService) {}

  appName = APP_NAME;
  homeRoutes = homeRoutes;
  isVisible = false;

  openCreateListDialog() {
    this.isVisible = true;
  }

  closeCreateListDialog() {
    this.isVisible = false;
  }

  onHideCreateListDialog() {
    this.isVisible = false;
  }

  onCloseSidebar() {
    this.mobileSidebarService.closeSidebar();
  }
}
