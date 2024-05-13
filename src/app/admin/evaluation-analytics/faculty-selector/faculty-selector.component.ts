import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-faculty-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-selector.component.html',
  styleUrl: './faculty-selector.component.css'
})
export class FacultySelectorComponent {
  @Output() selectFaculty = new EventEmitter();
  @Input() facultyData?: any;
  @Input() isSelected?: boolean;

  selected = false;

  sendSelected(data: any){
    //It stops at length 2 because this component is late on length update by 1 iteration.

    this.selected = !this.selected;
    if(this.selected){
      this.selectFaculty.emit([data, true]);
    }
    else{
      this.selectFaculty.emit([data, false]);
    }
  }
}
