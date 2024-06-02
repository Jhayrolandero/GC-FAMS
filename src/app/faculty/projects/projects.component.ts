import { Component } from '@angular/core';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormComponent } from './project-form/project-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectDialogComponent, ProjectFormComponent, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  constructor(
    public dialog: MatDialog,
  ){
    // this.dialog.open(ProjectDialogComponent)
  }

  openForm() {
    this.dialog.open(ProjectFormComponent)
  }

}
