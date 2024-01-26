import { Component, Input } from '@angular/core';
import { type ITrack } from '@core/interfaces';

@Component({
  selector: 'app-media-player-track',
  standalone: true,
  imports: [],
  templateUrl: './media-player-track.component.html',
  styleUrl: './media-player-track.component.css'
})
export class MediaPlayerTrackComponent {
  @Input() track: ITrack | null = null;
}
