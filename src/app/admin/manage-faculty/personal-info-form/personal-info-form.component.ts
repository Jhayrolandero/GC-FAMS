import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-personal-info-form',
  standalone: true,
  imports: [],
  templateUrl: './personal-info-form.component.html',
  styleUrl: './personal-info-form.component.css'
})
export class PersonalInfoFormComponent {

  @Output() personalInfo = new EventEmitter<string>();
}
