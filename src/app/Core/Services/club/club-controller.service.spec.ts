import { TestBed } from '@angular/core/testing';

import { ClubControllerService } from './club-controller.service';

describe('ClubControllerService', () => {
  let service: ClubControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
