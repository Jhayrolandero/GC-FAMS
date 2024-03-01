import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GcBoxComponent } from './gc-box.component';

describe('GcBoxComponent', () => {
  let component: GcBoxComponent;
  let fixture: ComponentFixture<GcBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GcBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GcBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
