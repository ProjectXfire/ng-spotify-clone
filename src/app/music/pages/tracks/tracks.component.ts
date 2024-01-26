import { Component } from '@angular/core';
import { BodyListComponent, HeaderListComponent } from '@app/music/components';

@Component({
  selector: 'app-tracks',
  standalone: true,
  imports: [HeaderListComponent, BodyListComponent],
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.css'
})
export class TracksComponent {}
