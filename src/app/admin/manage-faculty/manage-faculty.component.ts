import { Component } from '@angular/core';
import { GcBoxComponent } from './gc-box/gc-box.component';
import { PersonalInfoFormComponent } from './personal-info-form/personal-info-form.component';
@Component({
  selector: 'app-manage-faculty',
  standalone: true,
  imports: [GcBoxComponent, PersonalInfoFormComponent],
  templateUrl: './manage-faculty.component.html',
  styleUrl: './manage-faculty.component.css'
})
export class ManageFacultyComponent {

}
