import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyFormComponent } from './faculty-form.component';

describe('FacultyFormComponent', () => {
  let component: FacultyFormComponent;
  let fixture: ComponentFixture<FacultyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacultyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
