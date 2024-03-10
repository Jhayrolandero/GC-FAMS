import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IndustryExperience } from '../../../../services/Interfaces/industry-experience';
import { CommonModule } from '@angular/common';
import { EducationalAttainment } from '../../../../services/Interfaces/educational-attainment';
import { Router } from '@angular/router';
import { mainPort } from '../../../../app.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-faculty-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-experience.component.html',
  styleUrl: './faculty-experience.component.css'
})
export class FacultyExperienceComponent {
  @Input() experiences?: IndustryExperience[];
  @Output() setExpEdit = new EventEmitter<IndustryExperience>();
  @Output() setType = new EventEmitter<string>();

  //Send selected resume info on form component
  sendValueParams(value: IndustryExperience) {
    this.setExpEdit.emit(value);
  }

  //Change form type.
  changeType(value: string) {
    this.setType.emit(value);
  }
  
  
  showCrud = false;
  tempPort = mainPort;
}
