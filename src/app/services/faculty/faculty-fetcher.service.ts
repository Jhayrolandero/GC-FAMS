import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommunityExtension } from '../Interfaces/community-extension';
import { mainPort } from '../../app.component';
import { Profile } from '../Interfaces/profile';
import { Schedule } from '../admin/schedule';
import { Resume } from '../Interfaces/resume';
import { Evaluation } from '../Interfaces/evaluation';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Faculty } from '../Interfaces/faculty';
import { College } from '../Interfaces/college';
import { Certifications } from '../Interfaces/certifications';
import { Expertise } from '../Interfaces/expertise';
import { IndustryExperience } from '../Interfaces/industry-experience';
import { EducationalAttainment } from '../Interfaces/educational-attainment';
@Injectable({
  providedIn: 'root'
})
export class FacultyFetcherService {

  constructor(private http: HttpClient, private auth: AuthService) { }



  //Fetches cookie tokem
  getHeader(){
    return  new HttpHeaders().set("Authorization", "Bearer " + this.auth.getToken());
  }

  

  //All fetch commands for faculty
  fetchCommex(){
    return this.http.get<CommunityExtension[]>(mainPort + '/GC-FaMS-API/API/getcommex/fetchCommex', {headers:this.getHeader()});
  }

  fetchSchedDay(){
    return this.http.get<Schedule[]>(mainPort + '/GC-FaMS-API/API/getschedules/fetchFaculty', {headers:this.getHeader()});
  }

  fetchProfile(){
    return this.http.get<Profile>(mainPort + '/GC-FaMS-API/API/getprofile/fetchProfile', {headers:this.getHeader()});
  }

  fetchResume(){
    return this.http.get<Resume>(mainPort + '/GC-FaMS-API/API/getresume/fetchResume', {headers:this.getHeader()});
  }

  fetchEvaluation(){
    return this.http.get<Evaluation[]>(mainPort + '/GC-FaMS-API/API/getevaluation/fetchEvaluation', {headers:this.getHeader()});
  }

  fetchCertificate(){
    return this.http.get<Certifications[]>(mainPort + '/GC-FaMS-API/API/certificate', {headers:this.getHeader()});
  }
  fetchExperience(){
    return this.http.get<IndustryExperience[]>(mainPort + '/GC-FaMS-API/API/experience', {headers:this.getHeader()});
  }
  fetchEducation(){
    return this.http.get<EducationalAttainment[]>(mainPort + '/GC-FaMS-API/API/education', {headers:this.getHeader()});
  }
  fetchExpertise(){
    return this.http.get<Expertise[]>(mainPort + '/GC-FaMS-API/API/expertise', {headers:this.getHeader()});
  }
  fetchFaculty() {
    return this.http.get<Faculty[]>(mainPort + '/GC-FaMS-API/API/faculty', {headers:this.getHeader()});
  }

  fetchCollege() {
    return this.http.get<College[]>(mainPort + '/GC-FaMS-API/API/fetchCollege', {headers:this.getHeader()});
  }
}
