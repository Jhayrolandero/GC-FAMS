import { Component, Input } from '@angular/core';
import { EducationalAttainment } from '../../../services/Interfaces/educational-attainment';
import { FacultyFetcherService } from '../../../services/faculty/faculty-fetcher.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { mainPort } from '../../../app.component';

@Component({
  selector: 'app-faculty-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-education.component.html',
  styleUrl: './faculty-education.component.css'
})
export class FacultyEducationComponent {
  @Input() educAttainment!: EducationalAttainment[];
  tempPort = mainPort;
}
