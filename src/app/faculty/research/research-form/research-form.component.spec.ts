import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchFormComponent } from './research-form.component';

describe('ResearchFormComponent', () => {
  let component: ResearchFormComponent;
  let fixture: ComponentFixture<ResearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
