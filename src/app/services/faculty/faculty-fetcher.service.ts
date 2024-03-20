import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommunityExtension } from '../Interfaces/community-extension';
import { mainPort } from '../../app.component';
import { Profile } from '../Interfaces/profile';
import { Schedule } from '../admin/schedule';
import { Resume } from '../Interfaces/resume';
import { Evaluation } from '../Interfaces/evaluation';
import { Faculty } from '../Interfaces/faculty';
import { College } from '../Interfaces/college';
@Injectable({
  providedIn: 'root'
})
export class FacultyFetcherService {
  constructor(private http: HttpClient) { }

  //Dynamic fetching function that i have no idea was actually possible
  fetchData(data: any, endpoint: string){
    //Get requests can just accept the undefined object to get its type
    return this.http.get<typeof data>(mainPort + '/GC-FaMS-API/API/' + endpoint);
  }
}