import { TestBed } from '@angular/core/testing';

import { AdminFetcherService } from './admin-fetcher.service';

describe('AdminFetcherService', () => {
  let service: AdminFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
