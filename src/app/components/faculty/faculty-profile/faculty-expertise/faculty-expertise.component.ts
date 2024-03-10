import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { mainPort } from '../../../../app.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Expertise } from '../../../../services/Interfaces/expertise';

@Component({
  selector: 'app-faculty-expertise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-expertise.component.html',
  styleUrl: './faculty-expertise.component.css'
})
export class FacultyExpertiseComponent {
  @Input() expertise?: Expertise[];
  @Output() setSpecEdit = new EventEmitter<Expertise>();
  @Output() setType = new EventEmitter<string>();

  //Send selected resume info on form component
  sendValueParams(value: Expertise) {
    this.setSpecEdit.emit(value);
  }

  //Change form type.
  changeType(value: string) {
    this.setType.emit(value);
  }
  
  
  showCrud = false;
  tempPort = mainPort;
}
