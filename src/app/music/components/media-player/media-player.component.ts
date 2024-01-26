import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITrack } from '@core/interfaces';
// Services
import { MediaPlayerService } from '@app/music/services';
// Components
import {
  MediaPlayerTrackComponent,
  MediaPlayerControlsComponent,
  MediaPlayerVolumenComponent
} from '..';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  standalone: true,
  imports: [
    CommonModule,
    MediaPlayerTrackComponent,
    MediaPlayerControlsComponent,
    MediaPlayerVolumenComponent
  ],
  templateUrl: './media-player.component.html',
  styleUrl: './media-player.component.css'
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  constructor(private mediaPlayerService: MediaPlayerService) {}

  isPlaying = false;
  track: ITrack | null = null;
  subscriptions: Subscription[] = [];
  duration: string = '00:00';
  currentTime: string = '00:00';
  progressBarTime = { duration: 0, currentTime: 0 };

  ngOnInit(): void {
    const subIsPlaying$ = this.mediaPlayerService.getIsPlayingObs$.subscribe((data) => {
      this.isPlaying = data;
    });
    const subsMP$ = this.mediaPlayerService.getSelectedTrackObs$.subscribe((data) => {
      this.track = data;
    });
    const subsD$ = this.mediaPlayerService.getDuration$.subscribe((data) => {
      this.duration = data;
    });
    const subsCT$ = this.mediaPlayerService.getCurrentTime.subscribe((data) => {
      this.currentTime = data;
    });
    const subsAT$ = this.mediaPlayerService.getAudioTime.subscribe((data) => {
      this.progressBarTime.duration = data.duration;
      this.progressBarTime.currentTime = data.currentTime;
    });
    this.subscriptions = [subIsPlaying$, subsMP$, subsD$, subsCT$, subsAT$];
  }

  onPlay() {
    this.mediaPlayerService.onPlay();
  }

  onPause() {
    this.mediaPlayerService.onPause();
  }

  onNextSong(value: number) {
    this.mediaPlayerService.onPlayNext(value);
  }

  onPreviousSong(value: number) {
    this.mediaPlayerService.onPlayPrevious(value);
  }

  onUpdateTrackTime(time: number) {
    this.mediaPlayerService.setUpdateTimeTrack = time;
  }

  onSetVolumen(volumen: number) {
    this.mediaPlayerService.setVolumen = volumen;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subs) => {
      subs.unsubscribe();
    });
    this.mediaPlayerService.onRemoveListener();
  }
}
