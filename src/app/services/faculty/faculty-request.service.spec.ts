import { TestBed } from '@angular/core/testing';

import { FacultyRequestService } from './faculty-request.service';

describe('FacultyRequestService', () => {
  let service: FacultyRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultyRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
