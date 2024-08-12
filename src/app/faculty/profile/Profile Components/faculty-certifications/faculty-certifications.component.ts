import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { mainPort } from '../../../../app.component';
import { Store } from '@ngrx/store';
import { selectAllCerts, selectFacultyCerts, selectFilteredFacultyCerts, filterCertSelector } from '../../../../state/faculty-state/faculty-state.selector';
import { FacultyRequestService } from '../../../../services/faculty/faculty-request.service';
import { MessageService } from '../../../../services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { loadCert } from '../../../../state/faculty-state/faculty-state.actions';
import { Router } from '@angular/router';
import { CertificationsFaculty } from '../../../../services/Interfaces/certifications-faculty';
import { ViewCertsComponent } from '../../../../components/view-certs/view-certs.component';
@Component({
  selector: 'app-faculty-certifications',
  standalone: true,
  imports: [CommonModule, ViewCertsComponent],
  templateUrl: './faculty-certifications.component.html',
  styleUrl: './faculty-certifications.component.css'
})
export class FacultyCertificationsComponent {
  public certifications$ = this.store.select(selectAllCerts);
  public existCertifications$ = this.store.select(selectFilteredFacultyCerts);
  public port = mainPort;
  public isEmpty = false;

  @Output() deleteEvent = new EventEmitter<any>();

  @Input('startDate') startDate: string = ''
  @Input('endDate') endDate: string = ''
  certsArr: CertificationsFaculty[] = []
  parsedCerts: CertificationsFaculty[][] = []
  router = inject(Router);
  constructor(
    private facultyRequest: FacultyRequestService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private store: Store
  ){

  }


  click(imgURL : string) {

    this.dialog.open(ViewCertsComponent, {
      data: {imgURL}
    })
    
      // const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      //   data: {name: this.name(), animal: this.animal()},
      // });
  
      // dialogRef.afterClosed().subscribe(result => {
      //   console.log('The dialog was closed');
      //   if (result !== undefined) {
      //     this.animal.set(result);
      //   }
      // });
    
    }
  ngOnChanges(changes: SimpleChanges): void {

    // if(this.startDate === '' || this.endDate === '') return
    this.store.select(filterCertSelector(this.startDate, this.endDate)).subscribe(res => this.certsArr = res as CertificationsFaculty[])
    this.parsedCerts = this.categFilter(this.certsArr);
  }

  categFilter(certsArr: CertificationsFaculty[]): CertificationsFaculty[][] {

    let speakership: CertificationsFaculty[] = [];
    let completion: CertificationsFaculty[] = [];
    let achievement: CertificationsFaculty[] = [];
    let appreciation: CertificationsFaculty[] = [];
    let recognition: CertificationsFaculty[] = [];
    let participation: CertificationsFaculty[] = [];


    certsArr.forEach(cert => {
      // console.log(cert);
      switch (cert.cert_type) {
        case 'Speakership':
          speakership.push(cert);
          break;

        case 'Completion':
          completion.push(cert);
          break;


        case 'Achievement':
          achievement.push(cert);
          break;

        case 'Appreciation':
          appreciation.push(cert);
          break;

        case 'Recognition':
          recognition.push(cert);
          break;

        case 'Participation':
          participation.push(cert);
          break;


        default:
          break;
      }
    })
    let ret: CertificationsFaculty[][] = [speakership, completion, achievement, appreciation, recognition, participation];
    return ret;

  }

  selectCv(cert: any){
    this.facultyRequest.patchData([2, cert], 'selectCv').subscribe({
      next: (next: any) => {console.log(next);},
      error: (error) => {console.log(error);},
      complete: () => {
        this.store.dispatch(loadCert());
        this.messageService.sendMessage("Record added to CV.", 1)
      }
    });
  }

  deleteCertificate(id: number){
    this.deleteEvent.emit(['deleteCert/' + id, 1]);
  }

  navigateUrl(id: number) {
    this.router.navigate(['faculty/cert', id])
  }

}



function filterCertDateRange(startDate: string, endDate: string): (state: object) => unknown {
  throw new Error('Function not implemented.');
}

