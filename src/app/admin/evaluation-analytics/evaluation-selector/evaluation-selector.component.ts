import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-evaluation-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evaluation-selector.component.html',
  styleUrl: './evaluation-selector.component.css'
})
export class EvaluationSelectorComponent {
  @Output() selectEvalFaculty = new EventEmitter();
  @Input() facultyData?: any;
  @Input() isSelected?: boolean;

  selected = false;

  sendSelected(data: any){
    //It stops at length 2 because this component is late on length update by 1 iteration.

    this.selected = !this.selected;
    if(this.selected){
      this.selectEvalFaculty.emit([data, true]);
    }
    else{
      this.selectEvalFaculty.emit([data, false]);
    }
  }
}
