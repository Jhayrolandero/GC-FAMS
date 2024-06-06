import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportingDocsDialogueComponent } from './supporting-docs-dialogue.component';

describe('SupportingDocsDialogueComponent', () => {
  let component: SupportingDocsDialogueComponent;
  let fixture: ComponentFixture<SupportingDocsDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportingDocsDialogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupportingDocsDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
