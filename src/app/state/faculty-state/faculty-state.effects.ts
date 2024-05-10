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

@Injectable()
export class CvEffects {

  constructor(
    private actions$: Actions,
    private facultyService: FacultyRequestService,
    private cryptoJS: CryptoJSService,
    private auth: AuthService
  ) { }


  decryptData<T>(ciphertext: Encryption): T {
    return this.cryptoJS.CryptoJSAesDecrypt<T>("ucj7XoyBfAMt/ZMF20SQ7sEzad+bKf4bha7bFBdl2HY=", ciphertext)
  }

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
    switchMap(() => this.facultyService.fetchData<Encryption>('getcommex/1?t=faculty')
      .pipe(
        map((data) => CvActions.loadCommexSuccess({ commex: this.decryptData<CommunityExtension[]>(data) })),
        catchError((error) => of(CvActions.loadCommexFailure({ error })))
      )
    )
  ));

  loadExpertise$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadExpertise),
    switchMap(() => this.facultyService.fetchData<Encryption>('expertise')
      .pipe(
        tap((data) => {
          const decryptedData = this.decryptData<[ExpertiseFaculty[], Expertise[]]>(data);
          console.log('Decrypted Data:', decryptedData); // Log decrypted data to console
        }),
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

