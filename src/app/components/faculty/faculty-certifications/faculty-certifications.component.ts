import { Component, Input } from '@angular/core';
import { mainPort } from '../../../app.component';
import { Certifications } from '../../../services/Interfaces/certifications';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faculty-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-certifications.component.html',
  styleUrl: './faculty-certifications.component.css'
})
export class FacultyCertificationsComponent {
  @Input() certifications?: Certifications[];
  tempPort = mainPort;
}
