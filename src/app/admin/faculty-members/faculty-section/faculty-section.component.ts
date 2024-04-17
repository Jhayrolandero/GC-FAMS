import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, Input, Output, SimpleChange, EventEmitter } from '@angular/core';
import { Faculty } from '../../../services/Interfaces/faculty';
import { College } from '../../../services/Interfaces/college';
import { mainPort } from '../../../app.component';
import { LoadingScreenComponent } from '../../../components/loading-screen/loading-screen.component';
import { forkJoin } from 'rxjs';
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
    this.getCollegeAndFaculty()
    this.refreshEmitter.emit(false)
    // Whenever the data in the parent changes, this method gets triggered
    // You can act on the changes here. You will have both the previous
    // value and the  current value here.
  }
  constructor(
    public facultyService: FacultyRequestService,
    private router: Router,
    public dialog: MatDialog) { }

  // facultyMembers: FacultyMember[] = []
  facultyMembers: Faculty[] = [];
  colleges: College[] = [];
  filteredArray: Faculty[] = []
  searchQuery: string = ''
  activeButton: string = ''
  isLoading: boolean = true

  ngOnInit(): void {
    // console.log(`Cached: ${this.facultyMembers.length}`)
    if (this.facultyMembers.length <= 0) {
      this.getCollegeAndFaculty()
    }
  }

  getCollegeAndFaculty() {
    forkJoin({
      collegeRequest: this.facultyService.fetchData<College[]>('fetchCollege'),
      facultyRequest: this.facultyService.fetchData<Faculty[]>('faculty')
    }).subscribe({
      next: (({ collegeRequest, facultyRequest }) => {
        this.facultyService.colleges = collegeRequest
        this.facultyService.facultyMembers = facultyRequest
      }),
      error: (error) => {
        console.log(error);
        this.router.navigate(['/'])
      },
      complete: () => {
        console.log(this.facultyService.facultyMembers)
        console.log(this.facultyService.colleges)
        this.facultyService.facultyMembers = this.facultyService.facultyMembers.map(facultyMember => {
          return {
            ...facultyMember,
            profile_image: mainPort + facultyMember.profile_image
          };
        });

        this.createFacultyMember()
        this.filteredArray = this.facultyMembers
        this.isLoading = false
      }
    })
  }


  createFacultyMember() {
    this.facultyMembers = this.facultyService.facultyMembers.map((facultyMember: Faculty) => {
      const facultyCollegeAbbrev = this.facultyService.colleges.find(
        (college) => college.college_ID === facultyMember.college_ID
      )?.college_abbrev || '';

      return {
        ...facultyMember,
        college: facultyCollegeAbbrev
      };
    });
  }

  deleteForm(id: number): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: { faculty_ID: id }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.deleted) {
        this.getCollegeAndFaculty();
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
          this.getCollegeAndFaculty();
        }
        console.log(res)
      })
    } else {
      this.dialog.open(FacultyFormComponent)
    }
  }

  filterCollege(keyword: string) {
    let filter = ''
    switch (keyword.toLowerCase()) {
      case 'ccs':
        filter = 'CCS'
        break
      case 'ceas':
        filter = 'CEAS'
        break
      case 'chtm':
        filter = 'CHTM'
        break
      case 'cahs':
        filter = 'CAHS'
        break
      case 'cba':
        filter = 'CBA'
        break
      default:
        filter = ''
        break
    }

    if (filter === '') {
      this.filteredArray = this.facultyMembers
      return
    }
    this.filteredArray = this.facultyMembers.filter((item: Faculty) => item.college === filter)
  }

  filterName() {
    this.filteredArray = this.facultyMembers.filter((item: Faculty) => item.first_name.toLowerCase().includes(this.searchQuery.toLowerCase()) || item.last_name.toLowerCase().includes(this.searchQuery.toLowerCase())
    )
  }
}
