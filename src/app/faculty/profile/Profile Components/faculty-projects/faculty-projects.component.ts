import { Component, EventEmitter, Output } from '@angular/core';
import { Project } from '../../../../services/Interfaces/project';
import { CommonModule } from '@angular/common';
import { FacultyRequestService } from '../../../../services/faculty/faculty-request.service';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectAllProj } from '../../../../state/faculty-state/faculty-state.selector';

@Component({
  selector: 'app-faculty-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-projects.component.html',
  styleUrl: './faculty-projects.component.css'
})
export class FacultyProjectsComponent {
  @Output() editEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();

  public projects$ = this.store.select(selectAllProj);
  
  constructor(
    private facultyRequest: FacultyRequestService, 
    public dialog: MatDialog, 
    private store: Store){}


  editProject(value: Project){
    this.editEvent.emit(value);
  }

  deleteProject(id: number){
    this.deleteEvent.emit(['deleteProj/' + id, 3]);
  }
}
