import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvDropdownComponent } from './cv-dropdown.component';

describe('CvDropdownComponent', () => {
  let component: CvDropdownComponent;
  let fixture: ComponentFixture<CvDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CvDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
