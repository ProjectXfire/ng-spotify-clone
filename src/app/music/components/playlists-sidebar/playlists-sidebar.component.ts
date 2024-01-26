import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StoreService } from '@app/music/services';
import { type IList } from '@core/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playlists-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlists-sidebar.component.html',
  styleUrl: './playlists-sidebar.component.css'
})
export class PlaylistsSidebarComponent implements OnDestroy {
  constructor(
    private router: Router,
    public storeService: StoreService
  ) {
    this.routerSubscription = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.routeSelected = e.url;
      }
    });
  }

  private routerSubscription: Subscription;
  routeSelected = '';

  onSelectPlaylist(id: string) {
    this.router.navigate([`/playlist/${id}`]);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
