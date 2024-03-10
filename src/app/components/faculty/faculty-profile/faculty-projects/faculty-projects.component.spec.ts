import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyProjectsComponent } from './faculty-projects.component';

describe('FacultyProjectsComponent', () => {
  let component: FacultyProjectsComponent;
  let fixture: ComponentFixture<FacultyProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacultyProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
