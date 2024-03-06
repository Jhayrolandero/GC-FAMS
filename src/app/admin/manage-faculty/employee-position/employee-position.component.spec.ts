import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePositionComponent } from './employee-position.component';

describe('EmployeePositionComponent', () => {
  let component: EmployeePositionComponent;
  let fixture: ComponentFixture<EmployeePositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeePositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
