import { Component, Input, OnInit } from '@angular/core';
// Types
import { type ITrack } from '@core/interfaces';
// Services
import { TracksService } from '@app/music/services';
// Components
import { TrackCardComponent } from '../track-card/track-card.component';

@Component({
  selector: 'app-header-list',
  standalone: true,
  imports: [TrackCardComponent],
  templateUrl: './header-list.component.html',
  styleUrl: './header-list.component.css'
})
export class HeaderListComponent implements OnInit {
  tracks: ITrack[] = [];

  constructor(private tracksService: TracksService) {}

  @Input() title = '';

  ngOnInit(): void {
    this.onGetTracks();
  }

  async onGetTracks(): Promise<void> {
    const { data } = await this.tracksService.getTracks();
    this.tracks = data;
  }
}
