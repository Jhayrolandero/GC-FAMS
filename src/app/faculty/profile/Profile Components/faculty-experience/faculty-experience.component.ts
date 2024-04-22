import { Component, Output } from '@angular/core';
import { EducationalAttainment } from '../../../../services/Interfaces/educational-attainment';
import { CommonModule } from '@angular/common'; 
import { FacultyRequestService } from '../../../../services/faculty/faculty-request.service';
import { MatDialog } from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllExp } from '../../../../state/faculty-state/faculty-state.selector';
import { IndustryExperience } from '../../../../services/Interfaces/industry-experience';

@Component({
  selector: 'app-faculty-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-experience.component.html',
  styleUrl: './faculty-experience.component.css'
})
export class FacultyExperienceComponent {
  @Output() editEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();

  public experiences$ = this.store.select(selectAllExp);
  
  constructor(
    private facultyRequest: FacultyRequestService, 
    public dialog: MatDialog, 
    private store: Store){}


  editExperience(value: IndustryExperience){
    this.editEvent.emit(value);
  }

  deleteExperience(id: number){
    this.deleteEvent.emit(['deleteExp/' + id, 2]);
  }
}
