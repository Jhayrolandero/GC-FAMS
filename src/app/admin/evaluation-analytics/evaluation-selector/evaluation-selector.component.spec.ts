import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationSelectorComponent } from './evaluation-selector.component';

describe('EvaluationSelectorComponent', () => {
  let component: EvaluationSelectorComponent;
  let fixture: ComponentFixture<EvaluationSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluationSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
