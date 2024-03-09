import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-forms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-forms.component.html',
  styleUrl: './add-forms.component.css'
})
export class AddFormsComponent {
  @Input() formType: string = '';
  @Output() setType = new EventEmitter<string>();

  emptyType(value: string) {
    console.log("empt");
    this.setType.emit(value);
  }
}