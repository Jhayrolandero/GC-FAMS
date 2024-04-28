import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommexComponent } from './commex.component';

describe('CommexComponent', () => {
  let component: CommexComponent;
  let fixture: ComponentFixture<CommexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
