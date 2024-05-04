import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultySectionComponent } from './faculty-section.component';

describe('FacultySectionComponent', () => {
  let component: FacultySectionComponent;
  let fixture: ComponentFixture<FacultySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultySectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacultySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
