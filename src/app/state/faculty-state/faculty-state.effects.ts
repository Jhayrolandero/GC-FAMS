import { FacultyRequestService } from "../../services/faculty/faculty-request.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as CvActions from "./faculty-state.actions";
import { catchError, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { Certifications } from "../../services/Interfaces/certifications";
import { mainPort } from "../../app.component";
import { EducationalAttainment } from "../../services/Interfaces/educational-attainment";
import { Profile } from "../../services/Interfaces/profile";
import { IndustryExperience } from "../../services/Interfaces/industry-experience";
import { Project } from "../../services/Interfaces/project";
import { Expertise } from "../../services/Interfaces/expertise";
import { Evaluation } from "../../services/Interfaces/evaluation";
import { CertificationsFaculty } from "../../services/Interfaces/certifications-faculty";
import { CoursesFaculty } from "../../services/Interfaces/courses-faculty";
import { Courses } from "../../services/Interfaces/courses";
import { CryptoJSService } from "../../services/crypto-js.service";
import { Encryption } from "../../services/Interfaces/encryption";

@Injectable()
export class CvEffects {
  constructor(
    private actions$: Actions,
    private facultyService: FacultyRequestService,
    private cryptoJS: CryptoJSService
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

  loadExpertise$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadExpertise),
    switchMap(() => this.facultyService.fetchData<Encryption>('expertise')
      .pipe(
        map((data) => CvActions.loadExpertiseSuccess({ expertises: this.decryptData<Expertise[]>(data) })),
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

