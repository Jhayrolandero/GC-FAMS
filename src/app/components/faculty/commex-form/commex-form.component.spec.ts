import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommexFormComponent } from './commex-form.component';

describe('CommexFormComponent', () => {
  let component: CommexFormComponent;
  let fixture: ComponentFixture<CommexFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommexFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommexFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
