import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsSidebarComponent } from './playlists-sidebar.component';

describe('PlaylistsSidebarComponent', () => {
  let component: PlaylistsSidebarComponent;
  let fixture: ComponentFixture<PlaylistsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistsSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaylistsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
