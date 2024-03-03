import { TestBed } from '@angular/core/testing';

import { ProfileFacultyFetcherService } from './profile-faculty-fetcher.service';

describe('ProfileFacultyFetcherService', () => {
  let service: ProfileFacultyFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileFacultyFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
