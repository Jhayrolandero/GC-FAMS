import { Injectable } from '@angular/core';
import { mainPort } from '../../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtToken } from '../jwt-token';
import { FormGroup } from '@angular/forms';
import { College } from '../Interfaces/college';
import { Faculty } from '../Interfaces/faculty';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultyRequestService {

  constructor(private http: HttpClient) { }


  colleges: College[] = []
  facultyMembers: Faculty[] = []

  //CRUD requests
  fetchData<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(mainPort + '/GC-FaMS-API/API/' + endpoint);
  }


  postData2<T>(data: FormData, endpoint: string): Observable<T> {
    return this.http.post<T>(mainPort + '/GC-FaMS-API/API/' + endpoint, data);
    // catch (error) {
    //   return this.http.post(mainPort + '/GC-FaMS-API/API/' + endpoint, data);
    // }
  }
  postData(data: any, endpoint: string) {
    try {
      console.log("Postdata initial req");
      return this.http.post<JwtToken>(mainPort + '/GC-FaMS-API/API/' + endpoint, data.getRawValue());
    }
    catch (error) {
      return this.http.post<JwtToken>(mainPort + '/GC-FaMS-API/API/' + endpoint, data);
    }
  }

  patchData(data: any, endpoint: string) {
    try {
      return this.http.patch<JwtToken>(mainPort + '/GC-FaMS-API/API/' + endpoint, data.getRawValue());
    }
    catch (error) {
      console.log("FormData")
      return this.http.patch<JwtToken>(mainPort + '/GC-FaMS-API/API/' + endpoint, data);
    }

  }
  deleteData(endpoint: string) {
    return this.http.delete<JwtToken>(mainPort + '/GC-FaMS-API/API/' + endpoint);
  }


  //Converts FormGroup with files to FormData
  formDatanalize(FormGroup: FormGroup): FormData {
    const formData: FormData = new FormData()

    Object.keys(FormGroup.controls).forEach((key: string) => {
      formData.append(key, FormGroup.get(key)?.value)
    });

    return formData
  }
}
