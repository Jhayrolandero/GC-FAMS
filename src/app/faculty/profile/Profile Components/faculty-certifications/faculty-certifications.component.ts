import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { mainPort } from '../../../../app.component';
import { Store } from '@ngrx/store';
import { selectAllCerts, selectFacultyCerts } from '../../../../state/faculty-state/faculty-state.selector';
import { FacultyRequestService } from '../../../../services/faculty/faculty-request.service';
import { MessageService } from '../../../../services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { loadCert } from '../../../../state/faculty-state/faculty-state.actions';
@Component({
  selector: 'app-faculty-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-certifications.component.html',
  styleUrl: './faculty-certifications.component.css'
})
export class FacultyCertificationsComponent { 
  public certifications$ = this.store.select(selectAllCerts);
  public existCertifications$ = this.store.select(selectFacultyCerts);
  public port = mainPort;
  @Output() deleteEvent = new EventEmitter<any>();

  constructor(
    private facultyRequest: FacultyRequestService, 
    public dialog: MatDialog, 
    private messageService: MessageService,
    private store: Store
  ){}

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
}



