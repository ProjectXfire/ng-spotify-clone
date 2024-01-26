import { Component, EventEmitter, Output, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { APP_VOLUMEN } from '@shared/contants';
import { type SliderChangeEvent, SliderModule } from 'primeng/slider';

@Component({
  selector: 'app-media-player-volumen',
  standalone: true,
  imports: [SliderModule, ReactiveFormsModule],
  templateUrl: './media-player-volumen.component.html',
  styleUrl: './media-player-volumen.component.css'
})
export class MediaPlayerVolumenComponent {
  @Output() emitVolumen: EventEmitter<number> = new EventEmitter();
  volumen = signal(APP_VOLUMEN);
  prevVolumen = APP_VOLUMEN;

  slider = new FormGroup({
    value: new FormControl(APP_VOLUMEN)
  });

  onChageVolumen(slider: SliderChangeEvent) {
    const { value } = slider;
    this.volumen.set(Number(value));
    this.prevVolumen = Number(value);
    this.emitVolumen.emit(Number(value));
  }

  onClickVolumen0() {
    this.volumen.set(this.prevVolumen);
    this.slider.setValue({ value: this.prevVolumen });
    this.emitVolumen.emit(this.prevVolumen);
  }

  onClickVolumen() {
    this.prevVolumen = this.volumen();
    this.emitVolumen.emit(0);
    this.volumen.set(0);
    this.slider.setValue({ value: 0 });
  }
}
