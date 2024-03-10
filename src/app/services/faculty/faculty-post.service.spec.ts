import { TestBed } from '@angular/core/testing';

import { FacultyPostService } from './faculty-post.service';

describe('FacultyPostService', () => {
  let service: FacultyPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultyPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
