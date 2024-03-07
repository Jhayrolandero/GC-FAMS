import { TestBed } from '@angular/core/testing';

import { AdminFetcherServiceService } from './admin-fetcher-service.service';

describe('AdminFetcherServiceService', () => {
  let service: AdminFetcherServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFetcherServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
