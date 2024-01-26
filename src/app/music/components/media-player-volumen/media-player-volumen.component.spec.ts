import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaPlayerVolumenComponent } from './media-player-volumen.component';

describe('MediaPlayerVolumenComponent', () => {
  let component: MediaPlayerVolumenComponent;
  let fixture: ComponentFixture<MediaPlayerVolumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaPlayerVolumenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediaPlayerVolumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
