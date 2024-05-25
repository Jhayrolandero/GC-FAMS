import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsErrorComponent } from '../../admin/manage-faculty/forms-error/forms-error.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsErrorComponent
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  @Input('facultyControlName') facultyControlName! : string;
  // @Input('facultyControlName') facultyControlName : FormControl<string | null | number> = new FormControl();
}
