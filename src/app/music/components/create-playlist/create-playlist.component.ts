import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
// Services
import { StoreService } from '@app/music/services';
// Components
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { InputErrorComponent } from '@shared/components';

@Component({
  selector: 'app-create-playlist',
  standalone: true,
  imports: [
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ButtonModule,
    InputErrorComponent
  ],
  templateUrl: './create-playlist.component.html',
  styleUrl: './create-playlist.component.css'
})
export class CreatePlaylistComponent {
  constructor(private storeService: StoreService) {}

  @Output() close = new EventEmitter();
  createPlaylistForm = new FormGroup({
    name: new FormControl({ value: '', disabled: false }, [Validators.required]),
    description: new FormControl({ value: '', disabled: false }, [Validators.required])
  });

  get name() {
    return this.createPlaylistForm.get('name');
  }

  get description() {
    return this.createPlaylistForm.get('description');
  }

  onClose() {
    this.close.emit();
    this.createPlaylistForm.reset();
  }

  onSubmit() {
    if (!this.createPlaylistForm.valid) return;
    const { name, description } = this.createPlaylistForm.value;
    this.storeService.createPlaylist({ name: name!, description: description! });
    this.onClose();
  }
}
