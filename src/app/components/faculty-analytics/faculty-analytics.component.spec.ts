import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyAnalyticsComponent } from './faculty-analytics.component';

describe('FacultyAnalyticsComponent', () => {
  let component: FacultyAnalyticsComponent;
  let fixture: ComponentFixture<FacultyAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacultyAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
