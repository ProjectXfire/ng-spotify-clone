import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// Services
import { MobileSibebarService } from '@app/music/services';
// Components
import { SidebarModule } from 'primeng/sidebar';
import {
  HeaderUserComponent,
  MediaPlayerComponent,
  MobileSidebarComponent,
  SidebarComponent
} from '@app/music/components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    SidebarComponent,
    HeaderUserComponent,
    SidebarModule,
    MobileSidebarComponent,
    MediaPlayerComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public mobileSidebarService: MobileSibebarService) {}

  onCloseSidebar() {
    this.mobileSidebarService.closeSidebar();
  }
}
