import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTracksComponent } from './table-tracks.component';

describe('TableTracksComponent', () => {
  let component: TableTracksComponent;
  let fixture: ComponentFixture<TableTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTracksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
