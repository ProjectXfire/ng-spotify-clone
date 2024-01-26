import { Injectable, signal } from '@angular/core';
import { ITrack } from '@core/interfaces';
import { APP_VOLUMEN } from '@shared/contants';
import { BehaviorSubject } from 'rxjs';

type TSelTrack = ITrack | null;
type TAudioTime = { duration: number; currentTime: number };
type IPlayPlaylist = { index: number; length: number; songs: ITrack[] };

@Injectable({
  providedIn: 'root'
})
export class MediaPlayerService {
  constructor() {
    this.audio = new Audio();
    this.listenEvents();
  }

  private selectedTrack$ = new BehaviorSubject<TSelTrack>(null);
  private isPlaying$ = new BehaviorSubject<boolean>(false);
  private duration$ = new BehaviorSubject<string>('00:00');
  private currentTime$ = new BehaviorSubject<string>('00:00');
  private audioTime$ = new BehaviorSubject<TAudioTime>({
    duration: 0,
    currentTime: 0
  });
  public audio: HTMLAudioElement;

  private playlistInfo = signal<IPlayPlaylist>({ index: 0, length: 0, songs: [] });

  set setSelectedTrack({ track, isPlaylist }: { track: ITrack; isPlaylist: boolean }) {
    if (!isPlaylist) this.playlistInfo.set({ index: 0, length: 0, songs: [] });
    this.selectedTrack$.next(track);
    this.audio.src = track.url;
    this.audio.volume = APP_VOLUMEN / 100;
    this.isPlaying$.next(true);
    this.audio.play();
  }

  set setUpdateTimeTrack(time: number) {
    this.audio.currentTime = time;
  }

  set setVolumen(volumen: number) {
    this.audio.volume = volumen / 100;
  }

  get getIsPlayingObs$() {
    return this.isPlaying$.asObservable();
  }

  get getSelectedTrackObs$() {
    return this.selectedTrack$.asObservable();
  }

  get getDuration$() {
    return this.duration$.asObservable();
  }

  get getCurrentTime() {
    return this.currentTime$.asObservable();
  }
  get getAudioTime() {
    return this.audioTime$.asObservable();
  }

  private convertDurationInString(time: number): string {
    if (isNaN(time)) return '00:00';
    const minLeft = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const minRight = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minLeft}:${minRight}`;
  }

  private convertCurrentTimeInString(time: number): string {
    const minLeftCurrent = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const minRightCurrent = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minLeftCurrent}:${minRightCurrent}`;
  }

  private calculateTime = () => {
    const { duration, currentTime } = this.audio;
    const minDuration = this.convertDurationInString(duration);
    const minCurrentTime = this.convertCurrentTimeInString(currentTime);
    this.audioTime$.next({ duration, currentTime });
    this.duration$.next(minDuration);
    this.currentTime$.next(minCurrentTime);
  };

  private autoNextSongOnPlaylist = () => {
    const { length, index, songs } = this.playlistInfo();
    if (length === 0) {
      this.isPlaying$.next(false);
      this.audio.currentTime = 0;
      return;
    }
    let currentIndex = index;
    currentIndex++;
    if (currentIndex < length) {
      this.playlistInfo.set({
        ...this.playlistInfo(),
        index: currentIndex
      });
      this.setSelectedTrack = { track: songs[currentIndex], isPlaylist: true };
    } else {
      this.playlistInfo.set({
        ...this.playlistInfo(),
        index: 0
      });
      this.setSelectedTrack = { track: songs[0], isPlaylist: true };
    }
  };

  onStartPlaylist(playlistInfo: IPlayPlaylist): void {
    const { index, length, songs } = playlistInfo;
    if (length === 0) return;
    this.playlistInfo.set({ index, length, songs });
    this.setSelectedTrack = { track: songs[0], isPlaylist: true };
  }

  onPlayNext(value: number) {
    const { length, index, songs } = this.playlistInfo();
    if (length === 0) return;
    const newIndex = index + value;
    if (newIndex < length) {
      this.playlistInfo.set({
        ...this.playlistInfo(),
        index: newIndex
      });
      this.setSelectedTrack = { track: songs[newIndex], isPlaylist: true };
    } else {
      this.playlistInfo.set({
        ...this.playlistInfo(),
        index: 0
      });
      this.setSelectedTrack = { track: songs[0], isPlaylist: true };
    }
  }

  onPlayPrevious(value: number) {
    const { length, index, songs } = this.playlistInfo();
    if (length === 0) return;
    const newIndex = index + value;
    if (newIndex >= 0) {
      this.playlistInfo.set({
        ...this.playlistInfo(),
        index: newIndex
      });
      this.setSelectedTrack = { track: songs[newIndex], isPlaylist: true };
    } else {
      this.playlistInfo.set({
        ...this.playlistInfo(),
        index: length - 1
      });
      this.setSelectedTrack = { track: songs[length - 1], isPlaylist: true };
    }
  }

  onPlay(): void {
    this.audio.play();
    this.isPlaying$.next(true);
  }
  onPause(): void {
    this.audio.pause();
    this.isPlaying$.next(false);
  }

  private listenEvents(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime);
    this.audio.addEventListener('ended', this.autoNextSongOnPlaylist);
  }

  onRemoveListener() {
    this.audio.removeEventListener('timeupdate', this.calculateTime);
    this.audio.removeEventListener('ended', this.autoNextSongOnPlaylist);
  }
}
