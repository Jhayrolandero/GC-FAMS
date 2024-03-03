import { Component, OnInit } from '@angular/core';
import { CommunityExtensionService } from '../../services/faculty/community-extension.service';
import { CommunityExtension } from '../../services/Interfaces/community-extension';
import { OtherCommexComponent } from './other-commex/other-commex.component';
import { NgFor, SlicePipe } from '@angular/common';
@Component({
  selector: 'app-community-extensions',
  standalone: true,
  imports: [OtherCommexComponent, NgFor, SlicePipe],
  templateUrl: './community-extensions.component.html',
  styleUrl: './community-extensions.component.css'
})
export class CommunityExtensionsComponent implements OnInit{
  commexs: CommunityExtension[] = [];
  min: number = 100;
  max: number = 250;
  constructor(private commService: CommunityExtensionService){}

  getCommex():void {
    this.commService.getAllCommex().subscribe(
      (commex :any) => {
        this.commexs = commex;
      }

    )
  }

  getRndInteger(): number {
    return Math.floor(Math.random() * (this.max - this.min + 1) ) + this.min;
  }

  ngOnInit(): void {
    this.getCommex()
  }
}
