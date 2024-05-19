import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationAnalyticsComponent } from './evaluation-analytics.component';

describe('EvaluationAnalyticsComponent', () => {
  let component: EvaluationAnalyticsComponent;
  let fixture: ComponentFixture<EvaluationAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluationAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluationAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
