import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFacultyComponent } from './manage-faculty.component';

describe('ManageFacultyComponent', () => {
  let component: ManageFacultyComponent;
  let fixture: ComponentFixture<ManageFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageFacultyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
