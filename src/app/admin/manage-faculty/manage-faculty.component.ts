import { Component, Output } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FacultySectionComponent } from './faculty-section/faculty-section.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Faculty } from '../../services/Interfaces/faculty';
import { EventEmitter } from '@angular/core';
import { AddFacultyComponent } from './add-faculty/add-faculty.component';

@Component({
  selector: 'app-manage-faculty',
  standalone: true,
  imports: [
    NgFor,
    LoadingScreenComponent,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FacultySectionComponent,
    AddFacultyComponent
  ],
  templateUrl: './manage-faculty.component.html',
  styleUrl: './manage-faculty.component.css'
})


export class ManageFacultyComponent {
  showAdd: boolean = false;
  editData?: Faculty;
  certToggle = false;
  commexToggle = false;
  seminarToggle = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.editData = undefined;
  }

  switchShow(){
    if(this.showAdd) this.editData = undefined;
    this.showAdd = !this.showAdd;
  }

  editFaculty(faculty: Faculty){
    this.editData = faculty;
    this.switchShow();
  }
}
