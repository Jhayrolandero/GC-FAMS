import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEvaluationComponent } from './manage-evaluation.component';

describe('ManageEvaluationComponent', () => {
  let component: ManageEvaluationComponent;
  let fixture: ComponentFixture<ManageEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageEvaluationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
