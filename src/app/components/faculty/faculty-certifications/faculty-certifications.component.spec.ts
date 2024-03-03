import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyCertificationsComponent } from './faculty-certifications.component';

describe('FacultyCertificationsComponent', () => {
  let component: FacultyCertificationsComponent;
  let fixture: ComponentFixture<FacultyCertificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyCertificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacultyCertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
