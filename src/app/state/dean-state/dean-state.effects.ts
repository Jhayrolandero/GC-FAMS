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

@Injectable()

export class DeanEffects {
  constructor(
    private actions$: Actions,
    private facultyService: FacultyRequestService
  ) { }

  loadColleges$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCollege),
    switchMap(() => this.facultyService.fetchData('fetchCollege')
      .pipe(
        tap((colleges) => console.log('College has loaded:', colleges)),
        map((colleges) => CvActions.loadCollegeSuccess({ colleges: colleges as College[] })),
        catchError((error) => of(CvActions.loadCollegeFailure({ error })))
      )
    )
  ));

  loadProfile$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCollegeProfile),
    switchMap(() => this.facultyService.fetchData('faculty')
      .pipe(
        tap((profile) => console.log('Faculty has loaded:', profile)),
        map((profile) => CvActions.loadCollegeProfileSuccess({ profile: profile as Faculty[] })),
        catchError((error) => of(CvActions.loadCollegeProfileFailure({ error })))
      )
    )
  ));


  loadEduc$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCollegeEduc),
    switchMap(() => this.facultyService.fetchData('education-college')
      .pipe(
        tap((educs) => console.log('Educational Attainment has loaded:', educs)),
        map((educs) => CvActions.loadCollegeEducSuccess({ educs: educs as EducationalAttainment[] })),
        catchError((error) => of(CvActions.loadCollegeEducFailure({ error })))
      )
    )
  ));

  loadCerts$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCollegeCert),
    switchMap(() => this.facultyService.fetchData('certificate-college')
      .pipe(
        tap((certs) => console.log('Certificates has loaded:', certs)),
        map((certs) => CvActions.loadCollegeCertSuccess({ certs: certs as CertificationsFaculty[] })),
        catchError((error) => of(CvActions.loadCollegeCertsFailure({ error })))
      )
    )
  ));

  loadCourses$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCollegeCourse),
    switchMap(() => this.facultyService.fetchData('schedules?t=college')
      .pipe(
        tap((courses) => console.log('Courses has loaded:', courses)),
        map((courses) => CvActions.loadCollegeCourseSuccess({ courses: courses as [CoursesFaculty[], Courses[]] })),
        catchError((error) => of(CvActions.loadCollegeCourseFailure({ error })))
      )
    )
  ));


  loadExp$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCollegeExp),
    switchMap(() => this.facultyService.fetchData('experience-college')
      .pipe(
        tap((exps) => console.log('Experience has loaded:', exps)),
        map((exps) => CvActions.loadCollegeExpSuccess({ exps: exps as IndustryExperience[] })),
        // catchError((error) => of(CvActions.loadCollegeExpFailure({ error } )))
        catchError((error) => {
          console.error('Error loading experience:', error);
          return of(CvActions.loadCollegeExpFailure({ error }));
        })
      )
    )
  ));

  loadProj$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCollegeProj),
    switchMap(() => this.facultyService.fetchData('project-college')
      .pipe(
        tap((proj) => console.log('Projects has loaded:', proj)),
        map((proj) => CvActions.loadCollegeProjSuccess({ proj: proj as Project[] })),
        catchError((error) => of(CvActions.loadCollegeProjFailure({ error })))
      )
    )
  ));

  loadExpertise$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCollegeExpertise),
    switchMap(() => this.facultyService.fetchData('expertise-college')
      .pipe(
        tap((expertises) => console.log('Expertise has loaded:', expertises)),
        map((expertises) => CvActions.loadCollegeExpertiseSuccess({ expertises: expertises as Expertise[] })),
        catchError((error) => of(CvActions.loadCollegeExpertiseFailure({ error })))
      )
    )
  ));

  loadCommex$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCollegeCommex),
    switchMap(() => this.facultyService.fetchData('getcommex/1?t=college')
      .pipe(
        tap((commex) => console.log('College Commex has loaded:', commex)),
        map((commex) => CvActions.loadCollegeCommexSuccess({ commex: commex as CommunityExtension[] })),
        catchError((error) => of(CvActions.loadCollegeCommexFailure({ error })))
      )
    )
  ));

  loadEvaluation$ = createEffect(() => this.actions$.pipe(
    ofType(CvActions.loadCollegeEval),
    switchMap(() => this.facultyService.fetchData<Evaluation[]>('evaluation-college')
      .pipe(
        tap((evals) => console.log('Evaluation has loaded:', evals)),
        map((evals) => {
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

