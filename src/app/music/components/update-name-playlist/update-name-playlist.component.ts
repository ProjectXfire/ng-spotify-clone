import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { type IList } from '@core/interfaces';
// Services
import { StoreService } from '@app/music/services';
import { MessageService } from 'primeng/api';
// Components
import { InputErrorComponent } from '@shared/components';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-update-name-playlist',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, ButtonModule, InputErrorComponent],
  templateUrl: './update-name-playlist.component.html',
  styleUrl: './update-name-playlist.component.css'
})
export class UpdateNamePlaylistComponent implements OnInit {
  constructor(
    private storeService: StoreService,
    private messageService: MessageService
  ) {}

  @Input() playlistId = '';
  @Input() playlistName = '';
  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter<IList>();

  updateNamePlaylistForm = new FormGroup({
    name: new FormControl({ value: '', disabled: false }, [Validators.required])
  });

  ngOnInit(): void {
    this.updateNamePlaylistForm.setValue({ name: this.playlistName });
  }

  get name() {
    return this.updateNamePlaylistForm.get('name');
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    if (!this.updateNamePlaylistForm.valid) return;
    const { name } = this.updateNamePlaylistForm.value;
    const { error, successfulMessage, data } = this.storeService.renamePlaylist(
      this.playlistId,
      name!
    );
    if (error) this.messageService.add({ severity: 'info', summary: 'Info', detail: error });
    if (successfulMessage) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: successfulMessage
      });
      this.close.emit();
      this.update.emit(data!);
    }
  }
}
