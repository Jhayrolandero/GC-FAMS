import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, filter, take } from 'rxjs';
import { EducationalAttainment } from '../../services/Interfaces/educational-attainment';
import { Store, select } from '@ngrx/store';
import { selectAnCert, selectAnEduc, selectAnExp, selectAnExpertise, selectCertDocs, selectEducDocs, selectExpDocs, selectIndustryDocs } from '../../state/faculty-state/faculty-state.selector';
import { CommonModule } from '@angular/common';
import { IndustryExperience } from '../../services/Interfaces/industry-experience';
import { ExpertiseFaculty } from '../../services/Interfaces/expertise-faculty';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { FacultyRequestService } from '../../services/faculty/faculty-request.service';
import { CryptoJSService } from '../../services/crypto-js.service';
import { loadSupportingDocs, postSupportDocs } from '../../state/faculty-state/faculty-state.actions';
import { SupportingDocs } from '../../services/Interfaces/supportingDocs';
import { FileDownloadService } from '../../services/downloadfile.service';
import { mainPort } from '../../app.component';
import { ExpSupportingDocs } from '../../services/Interfaces/expSupportDocs';
import { CertSupportingDocs } from '../../services/Interfaces/certSupportDocs';
import { IndustrySupportingDocs } from '../../services/Interfaces/industrySupportDocs';
import { Certifications } from '../../services/Interfaces/certifications';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
@Component({
  selector: 'app-supporting-docs',
  standalone: true,
  imports: [CommonModule, LoadingScreenComponent],
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
    private fileDownloadService: FileDownloadService
  ) {}

  form = this.fb.group({
    documents: this.fb.array([])
  });

  get documents() {
    return this.form.controls["documents"] as FormArray;
  }

router = inject(Router);
  view!: string
  data!: (EducationalAttainment | IndustryExperience | ExpertiseFaculty | Certifications)

  // supportDocsSub!: Subscription
  supportDocsObv$!: Observable<SupportingDocs[] | ExpSupportingDocs[] | CertSupportingDocs [] | IndustrySupportingDocs[]>
  // supportDocs: SupportingDocs[] = []
  subData!: Subscription
  docTitle!: string


  mainPort = mainPort
  docType: string = ''
  ngOnInit() {

    console.log(this.router.url.split('/')[2])
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      switch(this.router.url.split('/')[2].toLowerCase()) {
        case 'cert':
          this.subCert(this.id)
          this.title = 'cert';
          this.docType = 'certdocs'
          break;
        case 'educ':
          this.subEduc(this.id)
          this.view = 'educ'
          this.docType = 'educdocs'
          break;
        case 'industry':
          this.subIndustry(this.id)
          this.view = 'industry'
          this.docType = 'industrydocs'
          break;
        case 'expertise':
          this.subExpert(this.id)
          this.title = 'expertise';
          this.docType = 'expdocs'
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

    this.supportDocsObv$ = this.store.pipe(select(selectEducDocs(id)))

    // this.store.pipe(select(selectEducDocs(id))).subscribe(res => console.log(res))

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

    this.supportDocsObv$ = this.store.pipe(select(selectIndustryDocs(id)))

  }

  subCert(id: number) {
    this.subData = this.store.pipe(
      select(selectAnCert(id)),
      filter(data => !!data)
    ).subscribe({
      next : res =>  {
        this.data = res!
        this.docTitle = res!.cert_name
      }
    })

    this.supportDocsObv$ = this.store.pipe(select(selectCertDocs(id)))
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
    this.supportDocsObv$ = this.store.pipe(select(selectExpDocs(id)))
  }


  addDoc(event: Event) {
    const allowedFileType = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/x-zip-compressed",
      "",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];
    // const allowedFileType = [
    //   "image/png",
    //   "image/jpeg",
    //   "application/pdf",
    //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //   "application/x-zip-compressed",
    //   "text/plain",
    //   "",
    //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    // ];
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0]; // Using optional chaining to handle null or undefined

    if (file && allowedFileType.includes(file.type)) {
      // Create a new FormControl for the file and push it to the FormArray
      const fileControl = new FormControl(file);
      this.documents.push(fileControl);

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


    this.store.dispatch(postSupportDocs({ docType: this.docType, data: formData}))
  }

  download(fileUrl: string, title: string): void {

      this.fileDownloadService.saveFile(mainPort+fileUrl, title);
  }


  goBack() {
    this.router.navigate(['faculty/curriculum-vitae'])
  }

}

