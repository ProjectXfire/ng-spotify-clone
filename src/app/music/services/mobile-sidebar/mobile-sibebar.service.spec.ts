import { TestBed } from '@angular/core/testing';

import { MobileSibebarService } from './mobile-sibebar.service';

describe('MobileSibebarService', () => {
  let service: MobileSibebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileSibebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
