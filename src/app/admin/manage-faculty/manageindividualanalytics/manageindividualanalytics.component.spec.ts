import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageindividualanalyticsComponent } from './manageindividualanalytics.component';

describe('ManageindividualanalyticsComponent', () => {
  let component: ManageindividualanalyticsComponent;
  let fixture: ComponentFixture<ManageindividualanalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageindividualanalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageindividualanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
