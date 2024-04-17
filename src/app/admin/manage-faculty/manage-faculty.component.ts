import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FacultyFormComponent } from '../../components/admin/faculty-form/faculty-form.component';
import { forkJoin } from 'rxjs';
import { FacultySectionComponent } from '../faculty-members/faculty-section/faculty-section.component';

@Component({
  selector: 'app-manage-faculty',
  standalone: true,
  imports: [
    NgFor,
    LoadingScreenComponent,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FacultySectionComponent
  ],
  templateUrl: './manage-faculty.component.html',
  styleUrl: './manage-faculty.component.css'
})


export class ManageFacultyComponent {

  constructor(public dialog: MatDialog) { }

  refresh: boolean = false
  openForm(): void {
    const dialogRef = this.dialog.open(FacultyFormComponent);

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.added) {
        this.refresh = true
        console.log('added now refresh')
        // this.getCollegeAndFaculty();
      }
    });
  }

  isLoading: boolean = true


  getCollegeAndFaculty() {
    forkJoin({

    })
  }
}
