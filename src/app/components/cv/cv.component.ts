import { Component, Input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { Resume } from '../../services/Interfaces/resume';
import { Certifications } from '../../services/Interfaces/certifications';
import { EducationalAttainment } from '../../services/Interfaces/educational-attainment';
import { IndustryExperience } from '../../services/Interfaces/industry-experience';
import { Project } from '../../services/Interfaces/project';
import { Profile } from '../../services/Interfaces/profile';
import { FacultyRequestService } from '../../services/faculty/faculty-request.service';
import { Router } from '@angular/router';
import { mainPort } from '../../app.component';
import { profile } from 'console';
import { CommonModule } from '@angular/common';
import { Schedule } from '../../services/admin/schedule';
import { Store } from '@ngrx/store';
import { selectAllProfile, selectCourseSched, selectAllExp, selectAllProj, selectAllExpertise, selectAllEduc, selectFacultyExpertise, selectFacultyCerts } from '../../state/faculty-state/faculty-state.selector';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [ModalComponent, CommonModule],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.css'
})



export class CvComponent {
  tempPort = mainPort;
  profiles$ = this.store.select(selectAllProfile);
  courses$ =this.store.select(selectCourseSched);
  certs$ = this.store.select(selectFacultyCerts);
  exps$ = this.store.select(selectAllExp);
  projects$ = this.store.select(selectAllProj);
  specs$ = this.store.select(selectFacultyExpertise);
  educs$ = this.store.select(selectAllEduc);

  constructor(
    public store: Store) {
  }

  //OPEN PRINT SCREEN AFTER RENDER, TURN THIS OFF FOR DEV PURPOSES
  // ngAfterViewInit(){
  //   window.print();
  // }

}

