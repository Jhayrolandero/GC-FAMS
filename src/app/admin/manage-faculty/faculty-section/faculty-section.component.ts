import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, Input, Output, SimpleChange, EventEmitter } from '@angular/core';
import { Faculty } from '../../../services/Interfaces/faculty';
import { College } from '../../../services/Interfaces/college';
import { mainPort } from '../../../app.component';
import { LoadingScreenComponent } from '../../../components/loading-screen/loading-screen.component';
import { map } from 'rxjs/operators';
import { FacultyRequestService } from '../../../services/faculty/faculty-request.service';
import { FacultySkeletonComponent } from '../../../components/faculty-skeleton/faculty-skeleton.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../../components/dialog-box/dialog-box.component';
import { FacultyFormComponent } from '../../../components/admin/faculty-form/faculty-form.component';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCollegeFaculty } from '../../../state/dean-state/dean-state.selector';
import { Profile } from '../../../services/Interfaces/profile';
import { selectCollegeAbbrev, selectPrivilege } from '../../../state/faculty-state/faculty-state.selector';
@Component({
  selector: 'app-faculty-section',
  standalone: true,
  imports: [
    NgClass,
    NgFor,
    LoadingScreenComponent,
    CommonModule,
    FacultySkeletonComponent,
    MatButtonModule,
    MatMenuModule,
    DialogBoxComponent,
    FormsModule
  ],
  templateUrl: './faculty-section.component.html',
  styleUrl: './faculty-section.component.css'
})
export class FacultySectionComponent {
  constructor(
    public facultyService: FacultyRequestService,
    public store: Store,
    public dialog: MatDialog) { }

  //I know there's ngrx already so no passing of data is needed, but this is  the only situation that merits the passing of a faculty edit data lol
  @Output() editDataEvent = new EventEmitter<Faculty>();
  facultyMembers$ = this.store.select(selectCollegeFaculty);
  profileCollege$ = this.store.select(selectCollegeAbbrev)
privilege$ = this.store.select(selectPrivilege);

  colleges: College[] = [];
  filteredArray: Profile[] = []
  searchQuery: string = ''
  activeButton: string = 'all'
  port = mainPort;
  isLoading: boolean = false

  deleteForm(id: number): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: { faculty_ID: id }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.deleted) {
        // this.getCollegeAndFaculty();
      }
      console.log(res)
    })
  }

  editFaculty(faculty?: Faculty): void {
    this.editDataEvent.emit(faculty);
  }

  filterCollege(keyword: string) {
    let collegeKey = ''
    switch (keyword.toLowerCase()) {
      case 'ccs':
        collegeKey = 'CCS'
        break
      case 'ceas':
        collegeKey = 'CEAS'
        break
      case 'chtm':
        collegeKey = 'CHTM'
        break
      case 'cahs':
        collegeKey = 'CAHS'
        break
      case 'cba':
        collegeKey = 'CBA'
        break
      default:
        collegeKey = ''
        break
    }

    if (collegeKey === '') {
      this.facultyMembers$ = this.store.select(selectCollegeFaculty);
      return
    }
    this.facultyMembers$ = this.store.select(selectCollegeFaculty).pipe(
      map((data: Faculty[]) => data.filter(faculty => faculty.college_abbrev === collegeKey)))
  }

  filterName() {
    console.log("Filtering...");
    this.facultyMembers$ = this.store.select(selectCollegeFaculty).pipe(
      map((data: Faculty[]) => data.filter(faculty => faculty.first_name.toLowerCase().includes(this.searchQuery.toLowerCase()) || faculty.last_name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    ))
  }
}
