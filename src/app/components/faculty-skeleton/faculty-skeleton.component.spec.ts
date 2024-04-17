import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultySkeletonComponent } from './faculty-skeleton.component';

describe('FacultySkeletonComponent', () => {
  let component: FacultySkeletonComponent;
  let fixture: ComponentFixture<FacultySkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultySkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacultySkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
