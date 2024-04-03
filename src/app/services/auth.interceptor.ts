import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

//This triggers at every single post request.
export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authToken = inject(AuthService).getToken();
  req = req.clone({
    setHeaders: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  return next(req);
}

