import { FacultyRequestService } from "../../services/faculty/faculty-request.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as CvActions from "./cv.actions";
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { Certifications } from "../../services/Interfaces/certifications";
import { mainPort } from "../../app.component";
import { EducationalAttainment } from "../../services/Interfaces/educational-attainment";
import { Profile } from "../../services/Interfaces/profile";

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

    parseImageLink(i: Certifications){
        i.cert_image = mainPort + i.cert_image;
    }
}

