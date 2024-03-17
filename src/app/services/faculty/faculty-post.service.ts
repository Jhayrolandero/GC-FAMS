import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mainPort } from '../../app.component';
import { JwtToken } from '../jwt-token';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FacultyPostService {

  constructor(private http: HttpClient) { }

    //All fetch commands for faculty
    addRes(educForm: FormGroup, type: string){
      return this.http.post<JwtToken>(mainPort + '/GC-FaMS-API/API/' + type, educForm.getRawValue());
    }

    editRes(educForm: FormGroup, type: string, id: number){
      return this.http.patch<JwtToken>(mainPort + '/GC-FaMS-API/API/' + type + "/" + id, educForm.getRawValue());
    }

    deleteRes(id: number, type: string){
      return this.http.delete<JwtToken>(mainPort + '/GC-FaMS-API/API/' + type + "/" + id);
    }

    addFaculty(facultyInfo: FormData) {
      return this.http.post<JwtToken>(mainPort + '/gc-fams-api/API/faculty', facultyInfo)
    }

    addCommex(commexInfo: FormData){
      return this.http.post<JwtToken>(mainPort + '/gc-fams-api/API/addCommex', commexInfo)
    }

    formDatanalize(FormGroup: FormGroup) : FormData { //Converts FormGroup to FormData
      const formData : FormData = new FormData()

      Object.keys(FormGroup.controls).forEach((key: string) => {
        formData.append(key, FormGroup.get(key)?.value)
      });

      return formData
    }
}
