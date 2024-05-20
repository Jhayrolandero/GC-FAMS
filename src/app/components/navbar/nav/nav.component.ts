import { Component, Input, SimpleChanges } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
[x: string]: any;
  @Input('title') navTitle = '';
  @Input('source') imgSource =  '';
  @Input('index') barIndex = '';
  @Input('selectedBar') selectedBar = '';
  urlTitle!: string;

  //Initializes url title due to async nature of title for navigation
  ngOnInit(): void {
    this.urlTitle = this.navTitle.replace(" ", "-").toLowerCase();
    console.log(this.urlTitle)
  }

  //Band-aid solution for image switch. Will switch to a less-disgusting SVG solution later.
  changeImage():void{
    this.imgSource = "Blue" + this.imgSource;
  }

  revertImage():void{
    this.imgSource = this.imgSource.replaceAll('Blue', '');
  }
}
