import { FacultyRequestService } from "../../services/faculty/faculty-request.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as CertActions from "./cert.actions";
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { Certifications } from "../../services/Interfaces/certifications";
import { mainPort } from "../../app.component";

@Injectable()
export class CertEffects{
    constructor(
        private actions$: Actions,
        private facultyService: FacultyRequestService
    ) {}
    loadCerts$ = createEffect(() => this.actions$.pipe(
        ofType(CertActions.loadCert),
        switchMap(() => this.facultyService.fetchData('certificate')
            .pipe(
                tap((certs) => console.log('Certificates:', certs)), // Log the certificates array
                map((certs) => {
                    (certs as Certifications[]).forEach((cert: Certifications) => this.parseImageLink(cert));
                    return certs;
                }),
                map((certs) => CertActions.loadCertSuccess({certs: certs as Certifications[]})),
                catchError((error) => of(CertActions.loadCertsFailure({ error: "MY NUTSAKCS" } )))
            )
        )
    ));

    parseImageLink(i: Certifications){
        i.cert_image = mainPort + i.cert_image;
    }
}