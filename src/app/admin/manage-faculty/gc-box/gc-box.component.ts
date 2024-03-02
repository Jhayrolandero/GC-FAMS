import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gc-box',
  standalone: true,
  imports: [NgClass],
  templateUrl: './gc-box.component.html',
  styleUrl: './gc-box.component.css'
})
export class GcBoxComponent {

  @Input('collegeAbbv') collegeAbbv: string = ''
  @Input('collegeTitle') collegeTitle: string = ''
  @Input('imgPath') imgPath: string = ''
  @Input('bgColor') bgColor: string = ''
}
