import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaPlayerControlsComponent } from './media-player-controls.component';

describe('MediaPlayerControlsComponent', () => {
  let component: MediaPlayerControlsComponent;
  let fixture: ComponentFixture<MediaPlayerControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaPlayerControlsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediaPlayerControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
