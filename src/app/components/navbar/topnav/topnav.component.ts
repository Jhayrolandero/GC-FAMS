import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnav',
  standalone: true,
  imports: [],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.css'
})
export class TopnavComponent {
  @Output() setToggle = new EventEmitter<string>();

  constructor(private auth: AuthService, private router: Router){}

  triggerToggle(){
    this.setToggle.emit();
  }
}
