import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private cookieService: CookieService) { }

  getToken() {
    return this.cookieService.get('token') as string;
  }

  flushToken() {
    console.log("Deleted all tokens");
    this.cookieService.delete('token', '/');
  }
}
