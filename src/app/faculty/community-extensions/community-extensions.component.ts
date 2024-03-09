import { Component, OnInit } from '@angular/core';
import { CommunityExtension } from '../../services/Interfaces/community-extension';
import { OtherCommexComponent } from './other-commex/other-commex.component';
import { CommonModule, NgFor, SlicePipe } from '@angular/common';
import { FacultyFetcherService } from '../../services/faculty/faculty-fetcher.service';
import { mainPort } from '../../app.component';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
@Component({
  selector: 'app-community-extensions',
  standalone: true,
  imports: [OtherCommexComponent, NgFor, SlicePipe, CommonModule, LoadingScreenComponent],
  templateUrl: './community-extensions.component.html',
  styleUrl: './community-extensions.component.css'
})
export class CommunityExtensionsComponent{
  isLoading: boolean = true;
  commexs: CommunityExtension[] = [];
  min: number = 100;
  max: number = 250;

  constructor(private facultyService: FacultyFetcherService){
    this.getCommex();
  }

  // getCommex():void {
  //   this.facultyService.fetchCommex().subscribe((next) => {
  //     this.commexs = next;
  //     this.dateSorter();
  //     this.commexs.forEach(this.parseImageLink);
  //   }, (error) => {
  //     console.log(error);
  //   });
  // }
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

  getRndInteger(): number {
    return Math.floor(Math.random() * (this.max - this.min + 1) ) + this.min;
  }
}
