import { TestBed } from '@angular/core/testing';

import { CustomBGService } from './custom-bg.service';

describe('CustomBGService', () => {
  let service: CustomBGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomBGService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
