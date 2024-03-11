import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-forms-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forms-error.component.html',
  styleUrl: './forms-error.component.css'
})
export class FormsErrorComponent {

  @Input('formControlRequired') formControlRequired!: FormControl;
  @Input('formControlMinLength') formControlMinLength!: FormControl;
  @Input('formControlEmail') formControlEmail!: FormControl;
  @Input('formControlPattern') formControlPattern!: FormControl;
}
