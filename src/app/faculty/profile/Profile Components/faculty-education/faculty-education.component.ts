import { Component, Input, Output, SimpleChanges } from '@angular/core';
import { EducationalAttainment } from '../../../../services/Interfaces/educational-attainment';
import { CommonModule } from '@angular/common'; 
import { FacultyRequestService } from '../../../../services/faculty/faculty-request.service';
import { MatDialog } from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-faculty-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-education.component.html',
  styleUrl: './faculty-education.component.css'
})
export class FacultyEducationComponent {
  @Input() educRefresh: boolean = false;
  @Output() editEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();

  education?: EducationalAttainment[];
  
  constructor(private facultyRequest: FacultyRequestService, public dialog: MatDialog){
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

  editEducation(value: EducationalAttainment){
    this.editEvent.emit(value);
  }

  deleteEducation(){
    this.deleteEvent.emit();
  }
}
