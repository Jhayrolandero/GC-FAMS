import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Faculty } from '../../../services/Interfaces/faculty';
import { College } from '../../../services/Interfaces/college';
import { mainPort } from '../../../app.component';
import { LoadingScreenComponent } from '../../../components/loading-screen/loading-screen.component';
type FacultyMember = {
  first_name: string,
  middle_name: string,
  last_name: string,
  ext_name: string,
  email: string,
  teaching_position: string,
  employment_status: number,
  profile_image: string,
  college: string
}
@Component({
  selector: 'app-faculty-section',
  standalone: true,
  imports: [NgClass, NgFor, LoadingScreenComponent, CommonModule],
  templateUrl: './faculty-section.component.html',
  styleUrl: './faculty-section.component.css'
})
export class FacultySectionComponent implements OnChanges {
  isLoading: boolean = true
@Input('Faculty') faculties: Faculty[] = []
@Input('Colleges') colleges: College[] = []
facultyMembers: FacultyMember[]  = []
ngOnInit(): void {
  console.log(this.facultyMembers)
  console.log(this.colleges)
  this.createFacultyMember()
}

ngOnChanges(changes: SimpleChanges): void {
  this.createFacultyMember()
  console.log(changes)
}
  createFacultyMember() {
    this.facultyMembers = this.faculties.map((facultyMember: Faculty) => {
      let collegeAbbrev = '';
      for(let i = 0; i < this.colleges.length; i++) {
        console.log(this.colleges[i])
        if(this.colleges[i].college_ID == facultyMember.college_ID) {
          collegeAbbrev = this.colleges[i].college_abbrev
        }
      }
      return {
        first_name: facultyMember.first_name,
        middle_name: facultyMember.middle_name,
        last_name: facultyMember.last_name,
        ext_name: facultyMember.ext_name,
        email: facultyMember.email,
        teaching_position: facultyMember.teaching_position,
        employment_status: facultyMember.employment_status,
        profile_image: facultyMember.profile_image,
        college: collegeAbbrev
      };
    });

  }
}
