import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, Input, Output, SimpleChange, EventEmitter } from '@angular/core';
import { Faculty } from '../../../services/Interfaces/faculty';
import { College } from '../../../services/Interfaces/college';
import { mainPort } from '../../../app.component';
import { LoadingScreenComponent } from '../../../components/loading-screen/loading-screen.component';
import { filter, map } from 'rxjs/operators';
import { FacultyRequestService } from '../../../services/faculty/faculty-request.service';
import { Router } from '@angular/router';
import { FacultySkeletonComponent } from '../../../components/faculty-skeleton/faculty-skeleton.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MessageService } from '../../../services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../../components/dialog-box/dialog-box.component';
import { FacultyFormComponent } from '../../../components/admin/faculty-form/faculty-form.component';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCollegeFaculty } from '../../../state/dean-state/dean-state.selector';
import { Profile } from '../../../services/Interfaces/profile';
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

  @Input('refresh') refresh: boolean = false
  @Output() refreshEmitter = new EventEmitter<boolean>()

  ngOnChanges() {
    // Extract changes to the input property by its name
    // let change: SimpleChange = changes['data'];
    this.refreshEmitter.emit(false)
    // Whenever the data in the parent changes, this method gets triggered
    // You can act on the changes here. You will have both the previous
    // value and the  current value here.
  }
  constructor(
    public facultyService: FacultyRequestService,
    private router: Router,
    public store: Store,
    public dialog: MatDialog) { }

  // facultyMembers: FacultyMember[] = []
  facultyMembers$ = this.store.select(selectCollegeFaculty);
  colleges: College[] = [];
  filteredArray: Profile[] = []
  searchQuery: string = ''
  activeButton: string = ''
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

  openForm(faculty?: Faculty): void {


    if (faculty) {
      const dialogRef = this.dialog.open(FacultyFormComponent, {
        data: { faculty: faculty }
      })

      dialogRef.afterClosed().subscribe(res => {
        if (res && res.edited) {
          // this.getCollegeAndFaculty();
        }
        console.log(res)
      })
    } else {
      this.dialog.open(FacultyFormComponent)
    }
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
