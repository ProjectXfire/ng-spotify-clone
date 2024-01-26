import { Component, EventEmitter, Input, Output } from '@angular/core';
// Components
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-dialog-container',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './dialog-container.component.html',
  styleUrl: './dialog-container.component.css'
})
export class DialogContainerComponent {
  @Input() title: string = '';
  @Input() maxWidth: number = 600;
  @Input() isOpen = false;
  @Output() onHide = new EventEmitter();

  onClosing() {
    this.onHide.emit();
  }
}
