import { Component, OnInit } from '@angular/core';
import { CommunityExtension } from '../../services/Interfaces/community-extension';
import { OtherCommexComponent } from './other-commex/other-commex.component';
import { CommonModule, NgFor, SlicePipe } from '@angular/common';
import { FacultyFetcherService } from '../../services/faculty/faculty-fetcher.service';
import { mainPort } from '../../app.component';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { CommexFormComponent } from '../../components/faculty/commex-form/commex-form.component';
import { FacultyPostService } from '../../services/faculty/faculty-post.service';

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


  constructor(private facultyService: FacultyFetcherService){
    this.getCommex();
  }

  getCommex():void {
    this.facultyService.fetchCommex().subscribe({
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
}
