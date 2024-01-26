import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'spotify-clone';
}
