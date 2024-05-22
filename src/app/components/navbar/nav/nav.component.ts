import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
[x: string]: any;
  @Input('title') navTitle = '';
  @Input('source') imgSource =  '';
  @Input('selectedBar') selectedBar = '';
  urlTitle!: string;

  constructor(){
  }

  //Initializes url title due to async nature of title for navigation
  ngOnInit(): void {
    this.urlTitle = this.navTitle.replace(" ", "-").toLowerCase();
  }

  // changeImage():void{
  //   console.log(this.imgSource.substring(0, 4) !== "Blue");
  //   if(this.selectedBar === this.urlTitle && this.imgSource.substring(0, 4) !== "Blue"){
  //     return;
  //   }
  //   this.imgSource = "Blue" + this.imgSource;
  // }

  // revertImage():void{
  //   if(this.selectedBar === this.urlTitle){
  //     return;
  //   }
  //   this.imgSource = this.imgSource.replaceAll('Blue', '');
  // }
}
