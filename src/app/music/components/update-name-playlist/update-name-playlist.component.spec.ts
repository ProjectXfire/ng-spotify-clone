import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNamePlaylistComponent } from './update-name-playlist.component';

describe('UpdateNamePlaylistComponent', () => {
  let component: UpdateNamePlaylistComponent;
  let fixture: ComponentFixture<UpdateNamePlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateNamePlaylistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateNamePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
