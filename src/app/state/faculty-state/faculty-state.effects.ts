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

@Injectable()




export class CvEffects{
    constructor(
        private actions$: Actions,
        private facultyService: FacultyRequestService
    ) {}

    loadProfile$ = createEffect(() => this.actions$.pipe(
        ofType(CvActions.loadProfile),
        switchMap(() => this.facultyService.fetchData('getprofile/fetchProfile')
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
                map((certs) => {
                    (certs as Certifications[]).forEach((cert: Certifications) => this.parseImageLink(cert));
                    return certs;
                }),
                map((certs) => CvActions.loadCertSuccess({certs: certs as Certifications[]})),
                catchError((error) => of(CvActions.loadCertsFailure({ error } )))
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

    parseImageLink(i: Certifications){
        i.cert_image = mainPort + i.cert_image;
    }
}

