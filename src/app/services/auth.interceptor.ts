import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

//This triggers at every single post request.
export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  const authToken = inject(AuthService).getToken();
  req = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return next(req).pipe(
    catchError((err) => {
      if(err.status == 403){
        console.error(err);
        router.navigate(['/']);
      }
      return throwError(err);
    })
  )
}

