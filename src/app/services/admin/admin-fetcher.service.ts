import { Injectable } from '@angular/core';
import { mainPort } from '../../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { College } from '../Interfaces/college';

@Injectable({
  providedIn: 'root'
})
export class AdminFetcherService {
  constructor(private http: HttpClient) { }

  //All fetch commands for faculty
  fetchCollege(){
    return this.http.get<College[]>(mainPort + '/GC-FaMS-API/API/fetchCollege');
  }

  excelGenerator(data: any){
    return this.http.post(mainPort + '/GC-FaMS-API/API/generateExcel', data, { responseType: 'blob' });
  }
}