import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { mainPort } from '../../app.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAllProfile, selectCourseSched, selectAllExp, selectAllProj, selectAllExpertise, selectAllEduc, selectFacultyExpertise, selectFacultyCerts } from '../../state/faculty-state/faculty-state.selector';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'

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

}

