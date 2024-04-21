import { Certifications } from '../../../../services/Interfaces/certifications';
import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FacultyRequestService } from '../../../../services/faculty/faculty-request.service';
import { mainPort } from '../../../../app.component';
@Component({
  selector: 'app-faculty-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-certifications.component.html',
  styleUrl: './faculty-certifications.component.css'
})
export class FacultyCertificationsComponent { 
  @Input() certRefresh: boolean = false;
  certifications?: Certifications[];
  
  constructor(private facultyRequest: FacultyRequestService){

    this.getCertificate();
  }

  //Checks if certRefresh has been poked. Triggers cert fetch re-request
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Refreshing certificate...");
    this.getCertificate();
  }

  getCertificate(){

    this.facultyRequest.fetchData('certificate').subscribe({
      next: (next: any) => {
        this.certifications = next;},
      error: (error) => {console.log(error)},
      complete: () => {
        this.certifications?.forEach(this.parseImageLink);
        console.log(this.certifications);
      }
    });
  }

  //Adds mainPort to all header image links.
  parseImageLink(i: Certifications){
    i.cert_image = mainPort + i.cert_image;
  }

}



