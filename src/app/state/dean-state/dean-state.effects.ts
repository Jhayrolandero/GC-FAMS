import { FacultyRequestService } from "../../services/faculty/faculty-request.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as CvActions from "./dean-state.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { EducationalAttainment } from "../../services/Interfaces/educational-attainment";
import { IndustryExperience } from "../../services/Interfaces/industry-experience";
import { Project } from "../../services/Interfaces/project";
import { Expertise } from "../../services/Interfaces/expertise";
import { Evaluation } from "../../services/Interfaces/evaluation";
import { CertificationsFaculty } from "../../services/Interfaces/certifications-faculty";
import { CoursesFaculty } from "../../services/Interfaces/courses-faculty";
import { Courses } from "../../services/Interfaces/courses";
import { Faculty } from "../../services/Interfaces/faculty";
import { CommunityExtension } from "../../services/Interfaces/community-extension";
import { College } from "../../services/Interfaces/college";
import { CryptoJSService } from "../../services/crypto-js.service";
import { Encryption } from "../../services/Interfaces/encryption";

@Injectable()

export class DeanEffects {
  constructor(
    private actions$: Actions,
    private facultyService: FacultyRequestService,
    private cryptoJS: CryptoJSService
  ) { }


  decryptData<T>(ciphertext: Encryption): T {
    return this.cryptoJS.CryptoJSAesDecrypt<T>("ucj7XoyBfAMt/ZMF20SQ7sEzad+bKf4bha7bFBdl2HY=", ciphertext)
  }


  loadColleges$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCollege),
    switchMap(() => this.facultyService.fetchData<Encryption>('fetchCollege')
      .pipe(
        map((data) => CvActions.loadCollegeSuccess({ colleges: this.decryptData<College[]>(data) })),
        catchError((error) => of(CvActions.loadCollegeFailure({ error })))
      )
    )
  ));

  loadProfile$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCollegeProfile),
    switchMap(() => this.facultyService.fetchData<Encryption>('faculty').pipe(
      map((data) => CvActions.loadCollegeProfileSuccess({ profile: this.decryptData<Faculty[]>(data) })),
      catchError((error) => of(CvActions.loadCollegeProfileFailure({ error })))
    ))
  ));

  loadEduc$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCollegeEduc),
    switchMap(() => this.facultyService.fetchData<Encryption>('education-college')
      .pipe(
        map((data) => CvActions.loadCollegeEducSuccess({ educs: this.decryptData<EducationalAttainment[]>(data) })),
        catchError((error) => of(CvActions.loadCollegeEducFailure({ error })))
      )
    )
  ));

  loadCerts$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCollegeCert),
    switchMap(() => this.facultyService.fetchData<Encryption>('certificate-college')
      .pipe(
        map((data) => CvActions.loadCollegeCertSuccess({ certs: this.decryptData<CertificationsFaculty[]>(data) })),
        catchError((error) => of(CvActions.loadCollegeCertsFailure({ error })))
      )
    )
  ));

  loadCourses$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCollegeCourse),
    switchMap(() => this.facultyService.fetchData<Encryption>('schedules?t=college')
      .pipe(
        map((data) => CvActions.loadCollegeCourseSuccess({ courses: this.decryptData<[CoursesFaculty[], Courses[]]>(data) })),
        catchError((error) => of(CvActions.loadCollegeCourseFailure({ error })))
      )
    )
  ));

  loadExp$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCollegeExp),
    switchMap(() => this.facultyService.fetchData<Encryption>('experience-college')
      .pipe(
        map((data) => CvActions.loadCollegeExpSuccess({ exps: this.decryptData<IndustryExperience[]>(data) })),
        catchError((error) => of(CvActions.loadCollegeExpFailure({ error })))
      )
    )
  ));

  loadProj$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCollegeProj),
    switchMap(() => this.facultyService.fetchData<Encryption>('project-college')
      .pipe(
        map((data) => CvActions.loadCollegeProjSuccess({ proj: this.decryptData<Project[]>(data) })),
        catchError((error) => of(CvActions.loadCollegeProjFailure({ error })))
      )
    )
  ));

  loadExpertise$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCollegeExpertise),
    switchMap(() => this.facultyService.fetchData<Encryption>('expertise-college')
      .pipe(
        map((data) => CvActions.loadCollegeExpertiseSuccess({ expertises: this.decryptData<Expertise[]>(data) })),
        catchError((error) => of(CvActions.loadCollegeExpertiseFailure({ error })))
      )
    )
  ));

  loadCommex$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCollegeCommex),
    switchMap(() => this.facultyService.fetchData<Encryption>('getcommex/1?t=college')
      .pipe(
        map((data) => CvActions.loadCollegeCommexSuccess({ commex: this.decryptData<CommunityExtension[]>(data) })),
        catchError((error) => of(CvActions.loadCollegeCommexFailure({ error })))
      )
    )
  ));

  loadEvaluation$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCollegeEval),
    switchMap(() => this.facultyService.fetchData<Encryption>('evaluation-college')
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

          return CvActions.loadCollegeEvalSuccess({ evals: modifiedEvals });
        }),
        catchError((error) => of(CvActions.loadCollegeEvalFailure({ error })))
      )
    )
  ));
}

