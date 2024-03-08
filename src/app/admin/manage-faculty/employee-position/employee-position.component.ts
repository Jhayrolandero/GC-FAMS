import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-employee-position',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-position.component.html',
  styleUrl: './employee-position.component.css'
})
export class EmployeePositionComponent {
  @Input()position?: string;
  @Input()selectedEmployeePosition?: string;
  @Input()selectedEmployeeType?: number;
  @Input('radioGroup') radioGroup:string = ''
  @Input('disabled') disabled:boolean = false;

  @Output() setRole = new EventEmitter()


  setEmployeePosition(value: string) {
    this.setRole.emit(value);
  }
}
