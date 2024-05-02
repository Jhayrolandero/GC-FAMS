import { FacultyRequestService } from "../../services/faculty/faculty-request.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as CvActions from "./faculty-state.actions";
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
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

@Injectable()




export class CvEffects{
    constructor(
        private actions$: Actions,
        private facultyService: FacultyRequestService
    ) {}

    loadProfile$ = createEffect(() => this.actions$.pipe(
        ofType(CvActions.loadProfile),
        switchMap(() => this.facultyService.fetchData('profile')
            .pipe(
                tap((profile) => console.log('Profile has loaded:', profile)),
                map((profile) => CvActions.loadProfileSuccess({profile: profile as Profile})),
                catchError((error) => of(CvActions.loadProfileFailure({ error } )))
            )
        )
    ));
    

    loadEduc$ = createEffect(() => this.actions$.pipe(
        ofType(CvActions.loadEduc),
        switchMap(() => this.facultyService.fetchData('education')
            .pipe(
                tap((educs) => console.log('Educational Attainment has loaded:', educs)),
                map((educs) => CvActions.loadEducSuccess({educs: educs as EducationalAttainment[]})),
                catchError((error) => of(CvActions.loadEducFailure({ error } )))
            )
        )
    ));

    loadCerts$ = createEffect(() => this.actions$.pipe(
        ofType(CvActions.loadCert),
        switchMap(() => this.facultyService.fetchData('certificate')
            .pipe(
                tap((certs) => console.log('Certificates has loaded:', certs)),
                map((certs) => CvActions.loadCertSuccess({certs: certs as [CertificationsFaculty[], Certifications[]]})),
                catchError((error) => of(CvActions.loadCertsFailure({ error } )))
            )
        )
    ));

    loadCourses$ = createEffect(() => this.actions$.pipe(
        ofType(CvActions.loadCourse),
        switchMap(() => this.facultyService.fetchData('schedules?t=faculty')
            .pipe(
                tap((courses) => console.log('Courses has loaded:', courses)),
                map((courses) => CvActions.loadCourseSuccess({courses: courses as [CoursesFaculty[], Courses[]]})),
                catchError((error) => of(CvActions.loadCourseFailure({ error } )))
            )
        )
    ));


    loadExp$ = createEffect(() => this.actions$.pipe(
        ofType(CvActions.loadExp),
        switchMap(() => this.facultyService.fetchData('experience')
            .pipe(
                tap((exps) => console.log('Experience has loaded:', exps)),
                map((exps) => CvActions.loadExpSuccess({exps: exps as IndustryExperience[]})),
                catchError((error) => of(CvActions.loadExpFailure({ error } )))
            )
        )
    ));

    loadProj$ = createEffect(() => this.actions$.pipe(
        ofType(CvActions.loadProj),
        switchMap(() => this.facultyService.fetchData('project')
            .pipe(
                tap((proj) => console.log('Projects has loaded:', proj)),
                map((proj) => CvActions.loadProjSuccess({proj: proj as Project[]})),
                catchError((error) => of(CvActions.loadProjFailure({ error } )))
            )
        )
    ));

    loadExpertise$ = createEffect(() => this.actions$.pipe(
        ofType(CvActions.loadExpertise),
        switchMap(() => this.facultyService.fetchData('expertise')
            .pipe(
                tap((expertises) => console.log('Expertise has loaded:', expertises)),
                map((expertises) => CvActions.loadExpertiseSuccess({expertises: expertises as Expertise[]})),
                catchError((error) => of(CvActions.loadExpertiseFailure({ error } )))
            )
        )
    ));

    loadEvaluation$ = createEffect(() => this.actions$.pipe(
        ofType(CvActions.loadEval),
        switchMap(() => this.facultyService.fetchData<Evaluation[]>('evaluation')
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
                    return CvActions.loadEvalSuccess({ evals: modifiedEvals });
                }),
                catchError((error) => of(CvActions.loadEvalFailure({ error })))
            )
        )
    ));
}

