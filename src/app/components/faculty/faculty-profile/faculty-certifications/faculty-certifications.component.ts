import { mainPort } from '../../../../app.component';
import { Certifications } from '../../../../services/Interfaces/certifications';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EducationalAttainment } from '../../../../services/Interfaces/educational-attainment';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-faculty-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-certifications.component.html',
  styleUrl: './faculty-certifications.component.css'
})
export class FacultyCertificationsComponent {
  @Input() certifications?: Certifications[];
  @Input() addEducToggle: boolean = false;
  @Output() setCertEdit = new EventEmitter<Certifications>();
  @Output() setType = new EventEmitter<string>();

  //Send selected resume info on form component
  sendValueParams(value: Certifications) {
    this.setCertEdit.emit(value);
  }

  //Change form type.
  changeType(value: string) {
    this.setType.emit(value);
  }
  
  
  showCrud = false;
  tempPort = mainPort;
}
