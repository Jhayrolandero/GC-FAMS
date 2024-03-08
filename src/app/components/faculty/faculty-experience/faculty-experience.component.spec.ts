import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyExperienceComponent } from './faculty-experience.component';

describe('FacultyExperienceComponent', () => {
  let component: FacultyExperienceComponent;
  let fixture: ComponentFixture<FacultyExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyExperienceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacultyExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
