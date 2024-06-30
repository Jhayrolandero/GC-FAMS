import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineGraph2Component } from './line-graph2.component';

describe('LineGraph2Component', () => {
  let component: LineGraph2Component;
  let fixture: ComponentFixture<LineGraph2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineGraph2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineGraph2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
