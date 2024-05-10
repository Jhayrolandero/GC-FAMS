import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expertise } from '../../../../services/Interfaces/expertise';
import { FacultyRequestService } from '../../../../services/faculty/faculty-request.service';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectFacultyExpertise } from '../../../../state/faculty-state/faculty-state.selector';

@Component({
  selector: 'app-faculty-expertise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-expertise.component.html',
  styleUrl: './faculty-expertise.component.css'
})
export class FacultyExpertiseComponent {
  @Output() editEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();

  public expertise$ = this.store.select(selectFacultyExpertise);
  
  constructor(
    private facultyRequest: FacultyRequestService, 
    public dialog: MatDialog, 
    private store: Store){}


  editExpertise(value: Expertise){
    this.editEvent.emit(value);
  }

  deleteExpertise(id: number){
    this.deleteEvent.emit(['deleteSpec/' + id, 4]);
  }
}
