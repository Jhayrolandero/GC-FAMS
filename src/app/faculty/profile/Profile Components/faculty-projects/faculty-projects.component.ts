import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../../../../services/Interfaces/project';
import { CommonModule } from '@angular/common';
import { EducationalAttainment } from '../../../../services/Interfaces/educational-attainment';
import { Router } from '@angular/router';
import { mainPort } from '../../../../app.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-faculty-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-projects.component.html',
  styleUrl: './faculty-projects.component.css'
})
export class FacultyProjectsComponent {
  @Input() projects?: Project[];
  @Output() setProjEdit = new EventEmitter<Project>();
  @Output() setType = new EventEmitter<string>();

  //Send selected resume info on form component
  sendValueParams(value: Project) {
    this.setProjEdit.emit(value);
  }

  //Change form type.
  changeType(value: string) {
    this.setType.emit(value);
  }
  
  
  showCrud = false;
  tempPort = mainPort;
}
