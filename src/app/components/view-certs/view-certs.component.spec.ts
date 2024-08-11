import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCertsComponent } from './view-certs.component';

describe('ViewCertsComponent', () => {
  let component: ViewCertsComponent;
  let fixture: ComponentFixture<ViewCertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCertsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewCertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
