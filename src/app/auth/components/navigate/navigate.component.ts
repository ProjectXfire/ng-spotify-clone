import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigate',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigate.component.html',
  styleUrl: './navigate.component.css'
})
export class NavigateComponent {
  constructor() {}

  @Input() navigateTo: string = '';
  @Input() message: string = '';
  @Input() clickMessage: string = '';
}
