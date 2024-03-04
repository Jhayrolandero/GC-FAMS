import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { mainPort } from '../../app.component';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  constructor(private http: HttpClient) {}


  programURI: string = "http://localhost/GC-FaMS-API/API/program"
  facultyURI: string = "http://localhost/GC-FaMS-API/API/faculty"

  fetchCollege(): Observable<any> {
    return this.http.get<any>(mainPort + "/GC-FaMS-API/API/college");
  }

  fetchProgram($params? :string): Observable<any> {

    let uri = this.programURI

    if($params) {
      uri = this.addParams(uri, $params)
    }
    return this.http.get<any>(uri);
  }

  addFaculty(faculty: any): Observable<any> {
    return this.http.post(this.facultyURI, faculty)

  }

  handleError(arg0: string, hero: any): (err: any, caught: Observable<import("@angular/common/http").HttpEvent<any>>) => import("rxjs").ObservableInput<any> {
    throw new Error('Method not implemented.');
  }

  addParams($URI: string, $params: string):string {

    return $URI.concat(`/${$params}`)
  }
}
