import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// export const AuthInterceptor implements HttpInterceptor {

//   constructor(private auth: AuthService){}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     console.log("I AM HERE");
//     req = req.clone({
//       setHeaders: {
//         'Content-Type' : 'application/json; charset=utf-8',
//         'Accept'       : 'application/json',
//         'Authorization': `Bearer ${this.auth.getToken()}`,
//       },
//     });

//     return next.handle(req);
//   }
// }

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authToken = inject(AuthService).getToken();
  req = req.clone({
    setHeaders: {
      'Content-Type' : 'application/json; charset=utf-8',
      'Accept'       : 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
  });
  console.log(req);
  return next(req);
}

