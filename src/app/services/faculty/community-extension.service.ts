import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommunityExtension } from '../Interfaces/community-extension';
import { mainPort } from '../../app.component';
import { schedule } from '../admin/schedule';

@Injectable({
  providedIn: 'root'
})
export class CommunityExtensionService {

  constructor(private http: HttpClient) { }
  url = mainPort + "/commex";

  displey(){
    return "Power vacuum!";
  }

  getAllCommex(){
    return this.http.get<CommunityExtension[]>(this.url);
  }
}
