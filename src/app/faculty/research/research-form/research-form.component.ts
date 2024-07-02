import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { ProfileFormComponent } from '../../../components/manage-profile/profile-form/profile-form.component';
import { CryptoJSService } from '../../../services/crypto-js.service';
import { FacultyRequestService } from '../../../services/faculty/faculty-request.service';
import { MessageService } from '../../../services/message.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { loadProj, loadResearch } from '../../../state/faculty-state/faculty-state.actions';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-research-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatStepperModule, CommonModule],
  templateUrl: './research-form.component.html',
  styleUrl: './research-form.component.css'
})
export class ResearchFormComponent {
  authorName: string = '';
  authorList: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<ProfileFormComponent>,
    private facultyRequest: FacultyRequestService,
    private store: Store,
    private cryptoJS: CryptoJSService,
    private messageService: MessageService
  ){}

  researchForm = new FormGroup({
    research_name: new FormControl('', [Validators.required]),
    publish_date: new FormControl('', [Validators.required]),
    research_link: new FormControl('', [Validators.required]),
    research_authors: new FormControl<string[]>([], [Validators.required]),
  })

  addAuthor(name: string){
    this.authorList.push(name);
    console.log(this.authorList);
  }

  submitForm(){
    this.researchForm.patchValue({
      research_authors: this.authorList
    })

    this.messageService.sendMessage("Adding Project...", 0)
    console.log(this.researchForm);

    this.facultyRequest.postData(this.researchForm, 'addResearch').subscribe({
      next(value) {console.log(value);},
      error: (error) => {
        console.log(error);
        this.messageService.sendMessage("Failed to add Research.", -1)
      },
      complete: () => {
        this.messageService.sendMessage("Research Successfully Added!", 1)
        this.store.dispatch(loadResearch());
        this.onNoClick();
      }
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
