import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EducationalAttainment } from '../../../../services/Interfaces/educational-attainment';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { mainPort } from '../../../../app.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-faculty-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-education.component.html',
  styleUrl: './faculty-education.component.css'
})
export class FacultyEducationComponent {
  @Input() educAttainment!: EducationalAttainment[];
  @Input() addEducToggle: boolean = false;
  @Output() setEducEdit = new EventEmitter<EducationalAttainment>();
  @Output() setType = new EventEmitter<string>();

  sendValueParams(value: EducationalAttainment) {
    this.setEducEdit.emit(value);
  }

  changeType(value: string) {
    console.log("empt");
    this.setType.emit(value);
  }
  
  
  showCrud = false;
  tempPort = mainPort;
}
