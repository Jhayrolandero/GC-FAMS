import { Certifications } from '../../../../services/Interfaces/certifications';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FacultyRequestService } from '../../../../services/faculty/faculty-request.service';
@Component({
  selector: 'app-faculty-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-certifications.component.html',
  styleUrl: './faculty-certifications.component.css'
})
export class FacultyCertificationsComponent { 
  certifications?: Certifications[];
  
  constructor(private facultyRequest: FacultyRequestService){
    this.getCertificate();
  }

  getCertificate(){

    this.facultyRequest.fetchData(this.certifications, 'certificate').subscribe({
      next: (next: any) => {
        this.certifications = next;
        console.log(next);},
      error: (error) => {console.log(error)},
      complete: () => {}
    });
  }

}



