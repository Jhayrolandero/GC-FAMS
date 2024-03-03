import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { schedule } from '../admin/schedule';
import { AuthService } from '../auth.service';
import { mainPort } from '../../app.component';
import { RequestOptions } from 'https';
import test from 'node:test';

@Injectable({
  providedIn: 'root'
})
export class ScheduleFacultyFetcherService {

  url = mainPort + '/GC-FaMS-API/API/getschedules/fetchFaculty';

  constructor(private http: HttpClient, private auth: AuthService) { }

  fetchAll(){
    return this.http.get<schedule[]>(this.url);
  }

  fetchSchedDay(){
    let took = new HttpHeaders().set("Authorization", "Bearer " + this.auth.getToken());
    return this.http.get<schedule[]>(this.url, {headers:took});
  }
}
