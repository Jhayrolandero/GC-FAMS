import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  constructor(private http: HttpClient) {}


  fetchCollege(): Observable<any> {
    return this.http.get<any>("http://localhost/GC-FaMS-API/API/college");
  }


}
