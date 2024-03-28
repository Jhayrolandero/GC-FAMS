import { Component, OnInit } from '@angular/core';
import { CommunityExtension } from '../../services/Interfaces/community-extension';
import { OtherCommexComponent } from './other-commex/other-commex.component';
import { CommonModule, NgFor, SlicePipe } from '@angular/common';
import { FacultyRequestService } from '../../services/faculty/faculty-request.service';
import { mainPort } from '../../app.component';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { CommexFormComponent } from '../../components/faculty/commex-form/commex-form.component';

@Component({
  selector: 'app-community-extensions',
  standalone: true,
  imports: [OtherCommexComponent, NgFor, SlicePipe, CommonModule, LoadingScreenComponent, CommexFormComponent],
  templateUrl: './community-extensions.component.html',
  styleUrl: './community-extensions.component.css'
})
export class CommunityExtensionsComponent{
  tempPort = mainPort;
  isLoading: boolean = true;
  formToggle: boolean = false;
  commexs: CommunityExtension[] = [];


  constructor(private facultyService: FacultyRequestService){
    this.getCommex();
  }

  getCommex():void {
    this.facultyService.fetchData(this.commexs, 'getcommex/fetchCommex').subscribe({
      next: (next) =>  this.commexs = next,
      error: (error) => console.log(error),
      complete: () => {
        this.dateSorter();
        this.commexs.forEach(this.parseImageLink);
        this.isLoading = false
      }
    });
  }

  //Adds mainPort to all header image links.
  parseImageLink(i: CommunityExtension){
    i.commex_header_img = mainPort + i.commex_header_img;
  }

  dateSorter(){
    this.commexs.sort(function(a, b){
      return new Date(b.commex_date).valueOf() - new Date(a.commex_date).valueOf();
    })
    console.log(this.commexs);
  }

  toggler(){
    this.formToggle = !this.formToggle;
    this.getCommex();
  }
}
