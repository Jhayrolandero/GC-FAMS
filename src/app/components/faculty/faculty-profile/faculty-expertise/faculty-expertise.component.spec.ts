import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyExpertiseComponent } from './faculty-expertise.component';

describe('FacultyExpertiseComponent', () => {
  let component: FacultyExpertiseComponent;
  let fixture: ComponentFixture<FacultyExpertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyExpertiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacultyExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
