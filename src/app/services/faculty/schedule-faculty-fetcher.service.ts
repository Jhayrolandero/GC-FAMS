import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { schedule } from '../admin/schedule';
import { AuthService } from '../auth.service';
import { RequestOptions } from 'https';

@Injectable({
  providedIn: 'root'
})
export class ScheduleFacultyFetcherService {
  url ='http://localhost:8080/GC-FaMS-API/API/getschedules/fetchFaculty';
  // tokenVal = document.cookie;


  constructor(private http: HttpClient, private auth: AuthService) { }

  fetchAll(){
    return this.http.get<schedule[]>(this.url);
  }

  fetchSchedDay(week: number){
    let took = new HttpHeaders().set("Authorization", "Bearer " + this.auth.getToken());
    return this.http.get<schedule[]>(this.url, {headers:took});
  }
}
