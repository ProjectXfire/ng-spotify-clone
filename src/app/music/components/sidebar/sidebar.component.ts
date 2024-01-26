import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { type Subscription } from 'rxjs';
import { homeRoutes } from '@shared/contants';
// Components
import { DialogContainerComponent, DividerComponent } from '@shared/components';
import { FormsModule } from '@angular/forms';
import { CreatePlaylistComponent, PlaylistsSidebarComponent } from '..';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    DividerComponent,
    CommonModule,
    RouterLink,
    DialogContainerComponent,
    CreatePlaylistComponent,
    FormsModule,
    PlaylistsSidebarComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnDestroy {
  constructor(private router: Router) {
    this.routerSubscription = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.routeSelected = e.url;
      }
    });
  }

  isVisible = false;
  url = '';

  private routerSubscription: Subscription;
  routeSelected = '';
  homeRoutes = homeRoutes;

  openCreateListDialog() {
    this.isVisible = true;
  }

  closeCreateListDialog() {
    this.isVisible = false;
  }

  onHideCreateListDialog() {
    this.isVisible = false;
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
