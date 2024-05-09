import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { jwtDecode } from "jwt-decode";
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  //Declare jwt to make isAdmin callable
  interface jwt {
    id: number,
    isAdmin: number
  }

  //Decode current token held
  const auth = inject(AuthService);
  const router = inject(Router);


  const token = auth.getToken()

  // Check the token Existance first
  if (token.length <= 0) {
    return false;
  }
  
  const decoded = jwtDecode<jwt>(token);
  const priv = decoded.isAdmin == 0 ? "faculty" : "admin";

  //Extract state url, split to array, then get 2nd index to check if url root is faculty or not. Maybe a better way to extract this?
  const urlRoot = state.url.split("/")[1];

  if (priv == urlRoot) {
    return true;
  }
  else {
    console.log("Discrepancy in privilege detected.");
    priv === "faculty" ? router.navigate(['faculty']) : router.navigate(['admin']);
    return false;

  }
};
