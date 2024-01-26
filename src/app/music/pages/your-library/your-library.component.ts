import { Component } from '@angular/core';
import { LibraryComponent } from '@app/music/components';

@Component({
  selector: 'app-your-library',
  standalone: true,
  imports: [LibraryComponent],
  templateUrl: './your-library.component.html',
  styleUrl: './your-library.component.css'
})
export class YourLibraryComponent {}
