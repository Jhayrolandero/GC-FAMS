import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

  constructor(private http: HttpClient) {}


  programURI: string = "http://localhost/GC-FaMS-API/API/program"

  fetchCollege(): Observable<any> {
    return this.http.get<any>("http://localhost/GC-FaMS-API/API/college");
  }

  fetchProgram($params? :string): Observable<any> {

    let uri = this.programURI

    if($params) {
      uri = this.addParams(uri, $params)
    }
    return this.http.get<any>(uri);
  }

  addParams($URI: string, $params: string):string {

    return $URI.concat(`/${$params}`)
  }
}
