import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaPlayerTrackComponent } from './media-player-track.component';

describe('MediaPlayerTrackComponent', () => {
  let component: MediaPlayerTrackComponent;
  let fixture: ComponentFixture<MediaPlayerTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaPlayerTrackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediaPlayerTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
