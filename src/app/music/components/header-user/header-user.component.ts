import { Component, OnInit } from '@angular/core';
import { SessionService } from '@core/services';
import { type User } from 'firebase/auth';
import { APP_NAME } from '@shared/contants';
// Services
import { MobileSibebarService } from '@app/music/services';
// Components
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [AvatarModule, ButtonModule],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent implements OnInit {
  appName = APP_NAME;
  user: User | null = null;

  constructor(
    private sessionService: SessionService,
    private mobileSidebarService: MobileSibebarService
  ) {}

  ngOnInit(): void {
    this.user = this.sessionService.session;
  }

  onOpenSidebar() {
    this.mobileSidebarService.openSidebar();
  }

  signOut() {
    this.sessionService.closeSession();
    window.location.reload();
  }
}
