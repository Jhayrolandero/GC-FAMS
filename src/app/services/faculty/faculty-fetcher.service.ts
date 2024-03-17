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

  //All fetch commands for faculty
  fetchCommex(){
    return this.http.get<CommunityExtension[]>(mainPort + '/GC-FaMS-API/API/getcommex/fetchCommex');
  }

  fetchSchedDay(){
    return this.http.get<Schedule[]>(mainPort + '/GC-FaMS-API/API/getschedules/fetchFaculty');
  }

  fetchProfile(){
    return this.http.get<Profile>(mainPort + '/GC-FaMS-API/API/getprofile/fetchProfile');
  }

  fetchResume(){
    return this.http.get<Resume>(mainPort + '/GC-FaMS-API/API/getresume/fetchResume');
  }

  fetchEvaluation(){
    return this.http.get<Evaluation[]>(mainPort + '/GC-FaMS-API/API/getevaluation/fetchEvaluation');
  }

  fetchFaculty() {
    return this.http.get<Faculty[]>(mainPort + '/GC-FaMS-API/API/faculty');
  }

  fetchCollege() {
    return this.http.get<College[]>(mainPort + '/GC-FaMS-API/API/fetchCollege');
  }
}
