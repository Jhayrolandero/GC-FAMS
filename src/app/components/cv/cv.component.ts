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

  //OPEN PRINT SCREEN AFTER RENDER, TURN THIS OFF FOR DEV PURPOSES
  // ngAfterViewInit(){
  //   window.print();
  // }

  // ngAfterViewInit(){
  //   // window.print();
  //   this.generatePDF()
  // }

// generatePDF() {
//   let pdf = new jsPDF('p', 'in', 'a4')
//   const cvForm: any = document.getElementById("cvForm")

//   pdf.html(cvForm, {
//     callback: (pdf) => {
//       pdf.save("CVFORM.pdf")
//     }
//   })

//   // html2canvas(cvForm, {scale:2}).then((canvas) =>{
//   //   const pdf = new jsPDF()
//   //   // pdf.addImage(canvas.toDataURL('image/png'), 'PNG',  0, 0)
//   //   pdf.addImage(canvas.toDataURL('img/png'), 'PNG', 0, 0, 211, 298)

//   //   pdf.setProperties({
//   //     title: "CV FORM"
//   //   })

//   //   pdf.save('cv.pdf')
//   // })
//  }
generatePDF() {
  const cvForm: any = document.getElementById("cvForm")

  html2canvas(cvForm, {scale:2}).then((canvas) =>{
    const pdf = new jsPDF()
    // pdf.addImage(canvas.toDataURL('image/png'), 'PNG',  0, 0)
    pdf.addImage(canvas.toDataURL('img/png'), 'PNG', 0, 0, 211, 298)

    pdf.setProperties({
      title: "CV FORM"
    })

    pdf.save('cv.pdf')
  })
 }


async getBase64ImageFromUrl(imageUrl : string) {
  var res = await fetch(imageUrl);
  var blob = await res.blob();

  return new Promise((resolve, reject) => {
    var reader  = new FileReader();
    reader.addEventListener("load", function () {
        resolve(reader.result);
    }, false);

    reader.onerror = () => {
      return reject(this);
    };
    reader.readAsDataURL(blob);
  })
}

//           [src]="tempPort + cv.profile!.profile_image"

}
