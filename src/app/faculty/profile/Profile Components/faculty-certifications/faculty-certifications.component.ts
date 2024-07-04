import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { mainPort } from '../../../../app.component';
import { Store } from '@ngrx/store';
import { selectAllCerts, selectFacultyCerts, selectFilteredFacultyCerts } from '../../../../state/faculty-state/faculty-state.selector';
import { FacultyRequestService } from '../../../../services/faculty/faculty-request.service';
import { MessageService } from '../../../../services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { loadCert } from '../../../../state/faculty-state/faculty-state.actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-faculty-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-certifications.component.html',
  styleUrl: './faculty-certifications.component.css'
})
export class FacultyCertificationsComponent {
  public certifications$ = this.store.select(selectAllCerts);
  public existCertifications$ = this.store.select(selectFilteredFacultyCerts);
  public port = mainPort;
  @Output() deleteEvent = new EventEmitter<any>();

  router = inject(Router);
  constructor(
    private facultyRequest: FacultyRequestService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private store: Store
  ){
    this.existCertifications$.subscribe({
      next(value) {
        console.log(value)
      },
    })
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



