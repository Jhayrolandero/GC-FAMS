import { Component , ViewChild, ElementRef, AfterViewInit, OnInit} from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { jsPDF } from "jspdf";
@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.css'
})
export class CvComponent implements OnInit {
  doc: any = new jsPDF('p', 'in', [612, 792])

  @ViewChild('cvElement') cvElement!: ElementRef;

  ngAfterViewInit() {
    console.log(this.cvElement.nativeElement);
    this.saveToPDF()

  }
  // Source HTMLElement or a string containing HTML.
  elementHTML = document.getElementById('cv');
  saveToPDF() {
    this.doc.html(this.cvElement.nativeElement, {
      callback: function (doc :any) {
        doc.save();
      }
   });
  }

  ngOnInit(): void {
      // this.saveToPDF()
  }
}
