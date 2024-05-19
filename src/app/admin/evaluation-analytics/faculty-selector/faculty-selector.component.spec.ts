import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultySelectorComponent } from './faculty-selector.component';

describe('FacultySelectorComponent', () => {
  let component: FacultySelectorComponent;
  let fixture: ComponentFixture<FacultySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultySelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacultySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
