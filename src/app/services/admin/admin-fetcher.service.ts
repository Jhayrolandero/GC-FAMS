import { Injectable } from '@angular/core';
import { mainPort } from '../../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { College } from '../Interfaces/college';

@Injectable({
  providedIn: 'root'
})
export class AdminFetcherService {
  constructor(private http: HttpClient, private auth: AuthService) { }

  //Fetches cookie tokem
  getHeader(){
    return  new HttpHeaders().set("Authorization", "Bearer " + this.auth.getToken());
  }

  //All fetch commands for faculty
  fetchCollege(){
    return this.http.get<College[]>(mainPort + '/GC-FaMS-API/API/fetchCollege', {headers:this.getHeader()});
  }
}
