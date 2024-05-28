import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTitleComponent } from './empty-title.component';

describe('EmptyTitleComponent', () => {
  let component: EmptyTitleComponent;
  let fixture: ComponentFixture<EmptyTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmptyTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
