import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { College } from '../../../services/Interfaces/college';

@Component({
  selector: 'app-gc-box',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './gc-box.component.html',
  styleUrl: './gc-box.component.css'
})
export class GcBoxComponent {
  @Input()college?: College;
  @Input('radioGroup') radioGroup:string = ''
  @Input('disabled') disabled:boolean = false


  @Output() setRole = new EventEmitter()

  setFacultyRole(value: string) {
    this.setRole.emit(value);
    console.log("emitted: " + value);
  }
}
