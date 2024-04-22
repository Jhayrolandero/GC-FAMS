import { Certifications } from '../../../../services/Interfaces/certifications';
import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { mainPort } from '../../../../app.component';
import { loadCert } from '../../../../state/faculty-state/faculty-state.actions';
import { Store } from '@ngrx/store';
import { selectAllCerts } from '../../../../state/faculty-state/faculty-state.selector';
@Component({
  selector: 'app-faculty-certifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-certifications.component.html',
  styleUrl: './faculty-certifications.component.css'
})
export class FacultyCertificationsComponent { 
  public certifications$ = this.store.select(selectAllCerts);
  constructor(private store: Store){}
}



