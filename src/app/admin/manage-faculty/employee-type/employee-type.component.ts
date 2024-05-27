import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employment } from '../../../services/Interfaces/employment';
@Component({
  selector: 'app-employee-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-type.component.html',
  styleUrl: './employee-type.component.css'
})
export class EmployeeTypeComponent {
  @Input() employment?: Employment;
  @Input() selectedEmployeeType?: number;
  @Input('radioGroup') radioGroup: string = ''
  @Input('disabled') disabled: boolean = false

  @Output() setRole = new EventEmitter()

  setEmployeeType(value: string) {
    this.setRole.emit(value);
  }

}
