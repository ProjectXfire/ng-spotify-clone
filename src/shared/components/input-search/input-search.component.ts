import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.css'
})
export class InputSearchComponent {
  @Input() placeholder: string = '';
  @Output() value: EventEmitter<string> = new EventEmitter();
  term: string = '';

  onKeyPress(e: KeyboardEvent) {
    if (e.code === 'Enter' && this.term) {
      this.value.emit(this.term);
    }
  }
}
