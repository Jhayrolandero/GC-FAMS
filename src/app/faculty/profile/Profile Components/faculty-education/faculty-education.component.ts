import { Component, Input, SimpleChanges } from '@angular/core';
import { EducationalAttainment } from '../../../../services/Interfaces/educational-attainment';
import { CommonModule } from '@angular/common'; 
import { FacultyRequestService } from '../../../../services/faculty/faculty-request.service';

@Component({
  selector: 'app-faculty-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-education.component.html',
  styleUrl: './faculty-education.component.css'
})
export class FacultyEducationComponent {
  @Input() educRefresh: boolean = false;
  education?: EducationalAttainment[];
  
  constructor(private facultyRequest: FacultyRequestService){
    console.log("Education!");
    this.getEducation();
  }

  //Checks if certRefresh has been poked. Triggers cert fetch re-request
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Refreshing Educational Experience...");
    this.getEducation();
  }

  getEducation(){
    this.facultyRequest.fetchData(this.education, 'education').subscribe({
      next: (next: any) => {
        this.education = next;},
      error: (error) => {console.log(error)},
      complete: () => {
        console.log(this.education);
      }
    });
  }
}
