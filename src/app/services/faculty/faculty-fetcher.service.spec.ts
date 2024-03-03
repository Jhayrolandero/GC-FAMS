import { TestBed } from '@angular/core/testing';

import { FacultyFetcherService } from './faculty-fetcher.service';

describe('FacultyFetcherService', () => {
  let service: FacultyFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultyFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
