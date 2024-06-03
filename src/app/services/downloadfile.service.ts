import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  constructor(private http: HttpClient) { }

  downloadFile(url: string) {
    // Prepend the CORS proxy to the file URL
    return this.http.get(url)
  }

  // saveFile(file: string, fileName: string): void {

  //   console.log(file)
  //   const newBlob = new Blob([file])
  //   const data = window.URL.createObjectURL(newBlob);
  //   const link = document.createElement("a");
  //   link.href = data;
  //   link.download = fileName; //set a name for file
  //   link.click();  }


  saveFile(file: string, fileName: string): void {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', file);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  // saveFile(blob: any, fileName: string): void {
  //   const link = document.createElement('a');
  //   link.href = window.URL.createObjectURL(blob);
  //   link.download = fileName;
  //   link.click();
  //   window.URL.revokeObjectURL(link.href);
  // }



}
