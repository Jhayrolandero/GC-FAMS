import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { EducationalAttainment } from '../../services/Interfaces/educational-attainment';
import { Store, select } from '@ngrx/store';
import { selectAnEduc, selectAnExp, selectAnExpertise } from '../../state/faculty-state/faculty-state.selector';
import { CommonModule } from '@angular/common';
import { IndustryExperience } from '../../services/Interfaces/industry-experience';
import { ExpertiseFaculty } from '../../services/Interfaces/expertise-faculty';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { FacultyRequestService } from '../../services/faculty/faculty-request.service';
import { CryptoJSService } from '../../services/crypto-js.service';

@Component({
  selector: 'app-supporting-docs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supporting-docs.component.html',
  styleUrl: './supporting-docs.component.css'
})
export class SupportingDocsComponent {


  sub!: Subscription
  id: number = 0
  title!: string

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private fb : FormBuilder,
    private facultyService: FacultyRequestService,
    private cryptoService: CryptoJSService
  ) {}

  form = this.fb.group({
    documents: this.fb.array([])
  });

  get documents() {
    return this.form.controls["documents"] as FormArray;
  }

router = inject(Router);
  view!: string
  data!: (EducationalAttainment | IndustryExperience | ExpertiseFaculty)

  subData!: Subscription

  docTitle!: string

  ngOnInit() {

    console.log(this.router.url.split('/')[2])
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      switch(this.router.url.split('/')[2].toLowerCase()) {
        case 'cert':
          this.title = 'cert';
          break;
        case 'educ':
          this.subEduc(this.id)
          this.view = 'educ'
          break;
        case 'industry':
          this.subIndustry(this.id)
          this.view = 'industry'
          break;
        case 'expertise':
          this.subExpert(this.id)
          this.title = 'expertise';
          break;
      }
    });
  }


  ngOnDestroy() {
    this.subData.unsubscribe()
    this.sub.unsubscribe()
  }

  subEduc(id: number) {
    this.subData = this.store.pipe(
      select(selectAnEduc(id)),
      filter(data => !!data)
    ).subscribe({
      next: res => {
        this.data = res!
        this.docTitle = res!.educ_title
        console.log(res)
      }
    })
  }

  subIndustry(id: number) {
    this.subData = this.store.pipe(
      select(selectAnExp(id)),
      filter(data => !!data)
    ).subscribe({
      next: res => {
        this.data = res!
        this.docTitle = res!.experience_title
        console.log(res)
      }
    })
  }

  subExpert(id: number) {
    this.subData = this.store.pipe(
      select(selectAnExpertise(id)),
      filter(data => !!data)
    ).subscribe({
      next: res => {
        this.data = res!
        this.docTitle = res!.expertise_name
        console.log(res)
      }
    })
  }


  addDoc(event: Event) {
    const allowedFileType = [
      "image/png",
      "image/jpeg",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/x-zip-compressed",
      "text/plain",
      "",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0]; // Using optional chaining to handle null or undefined

    if (file && allowedFileType.includes(file.type)) {
      // Create a new FormControl for the file and push it to the FormArray
      const fileControl = new FormControl(file);
      this.documents.push(fileControl);

      console.log(file);
      console.log(this.documents);
    } else {
      // Handle invalid file type
      console.error('Invalid file type');
    }
  }

  deleteDoc(index: number) {
    this.documents.removeAt(index);
  }


  submitDocuments() {
    const formData = new FormData();
    this.documents.controls.forEach((control, index) => {
      const file = control.value;
      formData.append(`documents[${index}]`, file);
    });


    // Append the ID to the FormData
    formData.append('id', this.id+'');


    this.facultyService.postData(formData, 'educdocs').subscribe({
      next: res => {
        this.facultyService.fetchData('educdocs').subscribe({
          next: (res:any) => {

            console.log(this.cryptoService.CryptoJSAesDecrypt<any>("ucj7XoyBfAMt/ZMF20SQ7sEzad+bKf4bha7bFBdl2HY=", res))

          },
          error: err => console.log(err)
        })
      },
      error: err => console.log(err)
    })
    // Send the FormData to the PHP backend
    // this.http.post('your-backend-url/upload.php', formData).subscribe(
    //   response => {
    //     console.log('Upload successful', response);
    //   },
    //   error => {
    //     console.error('Upload error', error);
    //   }
    // );
  }


  goBack() {
    this.router.navigate(['faculty/curriculum-vitae'])
  }

}

