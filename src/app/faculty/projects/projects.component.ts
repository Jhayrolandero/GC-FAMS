import { Component } from '@angular/core';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormComponent } from './project-form/project-form.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectAllProj } from '../../state/faculty-state/faculty-state.selector';
import { FacultyRequestService } from '../../services/faculty/faculty-request.service';
import { CryptoJSService } from '../../services/crypto-js.service';
import { MessageService } from '../../services/message.service';
import { key, mainPort } from '../../app.component';
import { Encryption } from '../../services/Interfaces/encryption';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectDialogComponent, ProjectFormComponent, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  proj$ = this.store.select(selectAllProj);
  port = mainPort;


  constructor(
    public dialog: MatDialog,
    private store: Store,
    private cryptoJS: CryptoJSService,
    private messageService: MessageService,
    private facultyRequest: FacultyRequestService
  ){
    // this.dialog.open(ProjectDialogComponent)
  }

  ngOnInit(){
    this.proj$.subscribe({
      next: (next: any) => {},
      error: (error) => {console.log(error)},
      complete: () => {
        this.messageService.sendMessage("CV has been updated.", 1);
      }}
    )
  }


  decryptData<T>(ciphertext: Encryption): T {
    return this.cryptoJS.CryptoJSAesDecrypt<T>("ucj7XoyBfAMt/ZMF20SQ7sEzad+bKf4bha7bFBdl2HY=", ciphertext)
  }

  encryptData(form : string) {
    return this.cryptoJS.CryptoJSAesEncrypt(key, JSON.stringify(form))
  }

  openProject(project: any){
    this.dialog.open(ProjectDialogComponent, {
      data: {
        project: project
      }
    })
  }

  openForm() {
    this.dialog.open(ProjectFormComponent)
  }

}
