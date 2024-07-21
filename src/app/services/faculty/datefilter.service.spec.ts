import { TestBed } from '@angular/core/testing';

import { DatefilterService } from './datefilter.service';

describe('DatefilterService', () => {
  let service: DatefilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatefilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
