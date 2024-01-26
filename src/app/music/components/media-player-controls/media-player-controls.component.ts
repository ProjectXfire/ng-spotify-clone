import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Components
import { SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-media-player-controls',
  standalone: true,
  imports: [SliderModule, FormsModule],
  templateUrl: './media-player-controls.component.html',
  styleUrl: './media-player-controls.component.css'
})
export class MediaPlayerControlsComponent {
  @Input() isPlaying: boolean = false;
  @Input() duration: string = '00:00';
  @Input() currentTime: string = '00:00';
  @Input() progressBarTime = { duration: 0, currentTime: 0 };
  @Output() play: EventEmitter<any> = new EventEmitter();
  @Output() pause: EventEmitter<any> = new EventEmitter();
  @Output() next: EventEmitter<number> = new EventEmitter();
  @Output() previous: EventEmitter<number> = new EventEmitter();
  @Output() updateTimeTrack: EventEmitter<number> = new EventEmitter();

  onPlay() {
    this.play.emit();
  }

  onPause() {
    this.pause.emit();
  }

  onNext() {
    this.next.emit(1);
  }

  onPrevious() {
    this.previous.emit(-1);
  }

  onUpdateTimeTrack(value: number) {
    this.updateTimeTrack.emit(value);
  }
}
