import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Profile } from '../Interfaces/profile';
import { AuthService } from '../auth.service';
import { RequestOptions } from 'https';
import { mainPort } from '../../app.component';

@Injectable({
  providedIn: 'root'
})
export class ProfileFacultyFetcherService {
  url = mainPort + '/GC-FaMS-API/API/getprofile/fetchProfile';
  constructor(private http: HttpClient, private auth: AuthService) { }

  fetchProfile(){
    let took = new HttpHeaders().set("Authorization", "Bearer " + this.auth.getToken());
    return this.http.get<Profile>(this.url, {headers:took});
  }
}
