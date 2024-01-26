import { Component, Input } from '@angular/core';
// Types
import { type ITrack } from '@core/interfaces';
// Services
import { TracksService } from '@app/music/services';
import { TrackCardComponent } from '../track-card/track-card.component';

@Component({
  selector: 'app-body-list',
  standalone: true,
  imports: [TrackCardComponent],
  templateUrl: './body-list.component.html',
  styleUrl: './body-list.component.css'
})
export class BodyListComponent {
  constructor(private tracksService: TracksService) {}

  @Input() title = '';

  tracks: ITrack[] = [];

  async onGetTracks(): Promise<void> {
    const { data } = await this.tracksService.getTracks();
    this.tracks = data;
  }

  ngOnInit(): void {
    this.onGetTracks();
  }
}
