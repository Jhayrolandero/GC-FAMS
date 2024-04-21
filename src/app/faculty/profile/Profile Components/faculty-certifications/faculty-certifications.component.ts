import { Certifications } from '../../../../services/Interfaces/certifications';
import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { mainPort } from '../../../../app.component';
import { loadCert } from '../../../../state/certs/cert.actions';
import { Store } from '@ngrx/store';
import { selectAllCerts } from '../../../../state/certs/cert.selector';
@Component({
  selector: 'app-faculty-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-certifications.component.html',
  styleUrl: './faculty-certifications.component.css'
})
export class FacultyCertificationsComponent { 
  @Input() certRefresh: boolean = false;
  public certifications$ = this.store.select(selectAllCerts);
  
  constructor(private store: Store){}

  //Checks if certRefresh has been poked. Triggers cert fetch re-request
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Refreshing certificate...");
  }
}



