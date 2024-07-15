import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { ProfileFormComponent } from '../../../components/manage-profile/profile-form/profile-form.component';
import { CryptoJSService } from '../../../services/crypto-js.service';
import { FacultyRequestService } from '../../../services/faculty/faculty-request.service';
import { MessageService } from '../../../services/message.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { loadResearch } from '../../../state/faculty-state/faculty-state.actions';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { map, Observable, Subscription } from 'rxjs';
import { Faculty } from '../../../services/Interfaces/faculty';
import { Encryption } from '../../../services/Interfaces/encryption';
import * as ProfileSelectors from '../../../state/faculty-state/faculty-state.selector';
import { ProfileState } from '../../../services/Interfaces/profileState';

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

  profileSub!: Subscription
  fetchAttendee$: Observable<Faculty[]> = this.facultyService.fetchData<Encryption>("faculty").pipe(
    map(data => this.decryptData<Faculty[]>(data))
  );
  // fetchAttendee$: Observable<Faculty[]> = this.facultyService.fetchData<Encryption>("faculty").pipe(of(this.decryptData<Faculty[]>(data)))
  profile$ = this.profileStore.pipe(select(ProfileSelectors.selectAllProfile))

  constructor(
    public dialogRef: MatDialogRef<ProfileFormComponent>,
    private facultyRequest: FacultyRequestService,
    private store: Store,
    private cryptoJS: CryptoJSService,
    private messageService: MessageService,
    private facultyService: FacultyRequestService,
    private profileStore: Store<{ profile: ProfileState }>,
  ){  }

  ngOnDestroy() {
    this.profileSub.unsubscribe()
  }
  decryptData<T>(ciphertext: Encryption): T {
    return this.cryptoJS.CryptoJSAesDecrypt<T>("ucj7XoyBfAMt/ZMF20SQ7sEzad+bKf4bha7bFBdl2HY=", ciphertext)
  }

  researchForm = new FormGroup({
    research_name: new FormControl('', [Validators.required]),
    publish_date: new FormControl('', [Validators.required]),
    research_link: new FormControl('', [Validators.required]),
    research_authors: new FormControl<string[]>([]),
  })

  addAuthor(e: Event){
    const selectElement = e.target as HTMLSelectElement;
    if(this.authorList.includes(selectElement.value)) return
    this.authorList.push(selectElement.value);
  }

  removeAuthor(idx: number) {
    const copyList = this.authorList.slice();
    copyList.splice(idx, 1);
    this.authorList = copyList;
  }

  submitForm(){
    if(!this.researchForm.valid) return

    this.profileSub = this.profile$.subscribe({
      next: res => {
        this.authorList.push(`${res!.first_name+' ' +
                    res!.middle_name +
                    ' ' +
                    res!.last_name +
                    ' ' +
                    (res!.ext_name ? res!.ext_name : '')}`)

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
      },
      error: err => {
        console.error(err)
        this.messageService.sendMessage("Something went wrong!", -1)
        this.onNoClick()
      }
    })

  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
