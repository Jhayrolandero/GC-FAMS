import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Certifications } from "../../services/Interfaces/certifications";
import { CertificationsFaculty } from "../../services/Interfaces/certifications-faculty";
import { Courses } from "../../services/Interfaces/courses";
import { CoursesFaculty } from "../../services/Interfaces/courses-faculty";
import { EducationalAttainment } from "../../services/Interfaces/educational-attainment";
import { Encryption } from "../../services/Interfaces/encryption";
import { ExpertiseFaculty } from "../../services/Interfaces/expertise-faculty";
import { Evaluation } from "../../services/Interfaces/evaluation";
import { Expertise } from "../../services/Interfaces/expertise";
import { IndustryExperience } from "../../services/Interfaces/industry-experience";
import { Profile } from "../../services/Interfaces/profile";
import { Project } from "../../services/Interfaces/project";
import { CryptoJSService } from "../../services/crypto-js.service";
import { FacultyRequestService } from "../../services/faculty/faculty-request.service";
import * as CvActions from "./faculty-state.actions";
import { CommunityExtension } from "../../services/Interfaces/community-extension";
import { AuthService } from "../../services/auth.service";
import { error } from "console";
import { key } from "../../app.component";
import { MessageService } from "../../services/message.service";
import { SupportingDocs } from "../../services/Interfaces/supportingDocs";
import { Store } from "@ngrx/store";
import { ExpSupportingDocs } from "../../services/Interfaces/expSupportDocs";
import { CertSupportingDocs } from "../../services/Interfaces/certSupportDocs";
import { IndustrySupportingDocs } from "../../services/Interfaces/industrySupportDocs";
import { Research, ResearchAuthor } from "../../services/Interfaces/research";
@Injectable()
export class CvEffects {

  constructor(
    private actions$: Actions,
    private facultyService: FacultyRequestService,
    private cryptoJS: CryptoJSService,
    private auth: AuthService,
    private messageService: MessageService,
    private store: Store,

  ) { }

  key: string = key

  decryptData<T>(ciphertext: Encryption): T {
    return this.cryptoJS.CryptoJSAesDecrypt<T>("ucj7XoyBfAMt/ZMF20SQ7sEzad+bKf4bha7bFBdl2HY=", ciphertext)
  }

  encryptData(form : string) {
    return this.cryptoJS.CryptoJSAesEncrypt(key, JSON.stringify(form))
  }

  resetPassword(action : {
    password: string;
    id?: number | undefined;
    }) {

      if(action.id) {
        return this.facultyService.patchData(this.encryptData(action.password), `password/${action.id}`)
      }
      return this.facultyService.patchData(this.encryptData(action.password), 'password')
  }

  postSupportDocs$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.postSupportDocs),
    tap(() => this.messageService.sendMessage("Uploading Document/s", 0)),
    switchMap((action) => this.facultyService.postData(action.data, action.docType).pipe(
      map(() => {
        this.messageService.sendMessage("Document/s Uploaded!", 1),
        this.store.dispatch(CvActions.loadSupportingDocs())
        return CvActions.postSupportDocsSuccess()
      }),
      catchError(error => of(CvActions.postSupportDocsFailure({error})))
    ))
  ))

  deleteSupportDocs$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.deleteSupportDocs),
    tap(() => this.messageService.sendMessage("Deleting Document", 0)),
    switchMap((action) => this.facultyService.deleteData(action.docType).pipe(
      map(() => {

        this.messageService.sendMessage("Document Deleted!", 1),
        this.store.dispatch(CvActions.loadSupportingDocs())
        return CvActions.deleteSupportDocsSuccess()
      }),
      catchError(error => of(CvActions.deleteSupportDocsFailure({error})))
    ))
  ))

  updatePassword$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.updatePassword),
    tap(() => this.messageService.sendMessage("Updating password", 0)),
    switchMap((action) => this.resetPassword(action).pipe(
      map(() => {
      this.messageService.sendMessage("Password updated successfully!", 1)
      return CvActions.updatePasswordSuccess({ password : action.password})
      }),
      catchError((error) => {
      this.messageService.sendMessage("Error in updating password", -1)
      return of(CvActions.updatePasswordFailure({error}))
      })
    ))
  ))


  updateProfile = createEffect(() => this.actions$.pipe(
    ofType(CvActions.updateInfo),
    tap(() => this.messageService.sendMessage("Updating Profile", 0)),
    switchMap((action) => this.facultyService.patchData(action.facultyData, "profile").pipe(
      map(() => {
        this.messageService.sendMessage("Profile updated successfully!", 1)
        return CvActions.updateInfoSuccess({facultyData: action.facultyData})
      }),
      catchError((error) => {
        this.messageService.sendMessage("Error in updating profile", -1)
        return of(CvActions.updateInfoFailure({error}))
      })
    ))
  ))

  loadEducDocs$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadSupportingDocs),
    switchMap(() => this.facultyService.fetchData<Encryption>('educdocs').pipe(
      map((data) => CvActions.loadEducSupportingDocsSuccess({ educDocs: this.decryptData<SupportingDocs[]>(data)})),
      catchError((error) => of(CvActions.loadEducSupportingDocsFailure({ error})))
    ))
  ))

  loadCertDocs$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadSupportingDocs),
    switchMap(() => this.facultyService.fetchData<Encryption>('certdocs').pipe(
      map((data) => CvActions.loadCertSupportingDocsSuccess({ certDocs: this.decryptData<CertSupportingDocs[]>(data)})),
      catchError((error) => of(CvActions.loadEducSupportingDocsFailure({ error})))
    ))
  ))

  loadExpDocs$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadSupportingDocs),
    switchMap(() => this.facultyService.fetchData<Encryption>('expdocs').pipe(
      map((data) => {

        console.log(this.decryptData<ExpSupportingDocs[]>(data))
        return CvActions.loadExpSupportingDocsSuccess({ expDocs: this.decryptData<ExpSupportingDocs[]>(data)})
      }),
      catchError((error) => of(CvActions.loadEducSupportingDocsFailure({ error})))
    ))
  ))

  loadIndustryDocs$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadSupportingDocs),
    switchMap(() => this.facultyService.fetchData<Encryption>('industrydocs').pipe(
      map((data) => CvActions.loadIndustrySupportingDocsSuccess({ industryDocs: this.decryptData<IndustrySupportingDocs[]>(data)})),
      catchError((error) => of(CvActions.loadEducSupportingDocsFailure({ error})))
    ))
  ))

  loadProfile$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadProfile),
    switchMap(() => this.facultyService.fetchData<Encryption>('profile').pipe(
      map((data) => CvActions.loadProfileSuccess({ profile: this.decryptData<Profile>(data) })),
      catchError((error) => of(CvActions.loadProfileFailure({ error })))
    ))
  ));

  loadEduc$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadEduc),
    switchMap(() => this.facultyService.fetchData<Encryption>('education')
      .pipe(
        map((data) => CvActions.loadEducSuccess({ educs: this.decryptData<EducationalAttainment[]>(data) })),
        catchError((error) => of(CvActions.loadEducFailure({ error })))
      )
    )
  ));

  loadCerts$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCert),
    switchMap(() => this.facultyService.fetchData<Encryption>('certificate')
      .pipe(
        map((data) => CvActions.loadCertSuccess({ certs: this.decryptData<[CertificationsFaculty[], Certifications[]]>(data) })),
        catchError((error) => of(CvActions.loadCertsFailure({ error })))
      )
    )
  ));

  loadCourses$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCourse),
    switchMap(() => this.facultyService.fetchData<Encryption>('schedules?t=faculty')
      .pipe(
        map((data) => CvActions.loadCourseSuccess({ courses: this.decryptData<[CoursesFaculty[], Courses[]]>(data) })),
        catchError((error) => of(CvActions.loadCourseFailure({ error })))
      )
    )
  ));

  loadExp$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadExp),
    switchMap(() => this.facultyService.fetchData<Encryption>('experience')
      .pipe(
        map((data) => CvActions.loadExpSuccess({ exps: this.decryptData<IndustryExperience[]>(data) })),
        catchError((error) => of(CvActions.loadExpFailure({ error })))
      )
    )
  ));

  loadProj$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadProj),
    switchMap(() => this.facultyService.fetchData<Encryption>('project')
      .pipe(
        map((data) => CvActions.loadProjSuccess({ proj: this.decryptData<Project[]>(data) })),
        catchError((error) => of(CvActions.loadProjFailure({ error })))
      )
    )
  ));

  loadCommex$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCommex),
    switchMap(() => this.facultyService.fetchData<Encryption>('getcommex/?t=faculty')
      .pipe(
        map((data) => CvActions.loadCommexSuccess({ commex: this.decryptData<CommunityExtension[]>(data) })),
        catchError((error) => of(CvActions.loadCommexFailure({ error })))
      )
    )
  ));

  loadResearch$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadResearch),
    switchMap(() => this.facultyService.fetchData<Encryption>('research')
      .pipe(
        map((data) => CvActions.loadResearchSuccess({ research: this.decryptData<[Research[], ResearchAuthor[]]>(data) })),
        catchError((error) => of(CvActions.loadResearchFailure({ error })))
      )
    )
  ));

  loadExpertise$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadExpertise),
    switchMap(() => this.facultyService.fetchData<Encryption>('expertise')
      .pipe(
        map((data) => CvActions.loadExpertiseSuccess({ expertises: this.decryptData<[ExpertiseFaculty[], Expertise[]]>(data) })),
        catchError((error) => of(CvActions.loadExpertiseFailure({ error })))
      )
    )
  ));

  loadEvaluation$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadEval),
    switchMap(() => this.facultyService.fetchData<Encryption>('evaluation')
      .pipe(
        map((data) => {

          const evals = this.decryptData<Evaluation[]>(data)

          const modifiedEvals = evals.map(evaluation => ({
            ...evaluation,
            evalAverage: parseFloat(((
              +evaluation.param1_score +
              +evaluation.param2_score +
              +evaluation.param3_score +
              +evaluation.param4_score +
              +evaluation.param5_score +
              +evaluation.param6_score
            ) / 6).toFixed(1))
          }));

          return CvActions.loadEvalSuccess({ evals: modifiedEvals });
        }),
        catchError((error) => of(CvActions.loadEvalFailure({ error })))
      )
    )
  ));
}

