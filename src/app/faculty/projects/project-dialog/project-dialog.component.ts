import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../../services/message.service';
import { FacultyRequestService } from '../../../services/faculty/faculty-request.service';
import { CryptoJSService } from '../../../services/crypto-js.service';
import { key, mainPort } from '../../../app.component';
import { Encryption } from '../../../services/Interfaces/encryption';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-dialog.component.html',
  styleUrl: './project-dialog.component.css'
})
export class ProjectDialogComponent {
  port = mainPort
  project = this.data.project
  authors$: any =  this.facultyRequest.fetchData(`project-authors/`+this.data.project.project_ID);
  images$: any =  this.facultyRequest.fetchData(`project-images/`+this.data.project.project_ID);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProjectDialogComponent>, 
    private messageService: MessageService,
    private cryptoJS: CryptoJSService,
    private facultyRequest: FacultyRequestService
  ) {
  }

  ngOnInit(){
    this.authors$.subscribe((next: any) => console.log(next))
  }

  decryptData<T>(ciphertext: Encryption): T {
    return this.cryptoJS.CryptoJSAesDecrypt<T>("ucj7XoyBfAMt/ZMF20SQ7sEzad+bKf4bha7bFBdl2HY=", ciphertext)
  }

  encryptData(form : string) {
    return this.cryptoJS.CryptoJSAesEncrypt(key, JSON.stringify(form))
  }
}
