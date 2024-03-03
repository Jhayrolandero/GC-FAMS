import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CommunityExtension } from '../../../services/Interfaces/community-extension';
@Component({
  selector: 'app-other-commex',
  standalone: true,
  imports: [NgFor],
  templateUrl: './other-commex.component.html',
  styleUrl: './other-commex.component.css'
})
export class OtherCommexComponent {
  @Input('commex') commexContent: CommunityExtension[] = [];


}
