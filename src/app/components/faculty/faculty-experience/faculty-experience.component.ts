import { Component, Input } from '@angular/core';
import { IndustryExperience } from '../../../services/Interfaces/industry-experience';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faculty-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-experience.component.html',
  styleUrl: './faculty-experience.component.css'
})
export class FacultyExperienceComponent {
  @Input() experiences?: IndustryExperience[];
}
