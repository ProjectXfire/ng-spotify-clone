import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-divider',
  standalone: true,
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.css'
})
export class DividerComponent {
  @Input() message? = '';
  @Input() color? = 'var(--slate-light)';
}
