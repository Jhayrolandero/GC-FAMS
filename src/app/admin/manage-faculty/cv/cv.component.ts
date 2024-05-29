import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  NgxDocViewerModule
} from 'ngx-doc-viewer';
import { mainPort } from '../../../app.component';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectProfileOne } from '../../../state/dean-state/dean-state.selector';
import { Faculty } from '../../../services/Interfaces/faculty';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [NgxDocViewerModule, CommonModule],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.css'
})
export class CvComponent {
  @Input() pdfID!: number;
  @Output() showCVEvent = new EventEmitter<number>();
  port = mainPort


  constructor(
  public store: Store,
  ) {}

  ngOnInit () {
    this.$facultyProfile = this.store.pipe(select(selectProfileOne(this.pdfID)))

  }

  $facultyProfile!: Observable<Faculty | undefined>


  goBack(){
    this.showCVEvent.emit(this.pdfID);
  }

}
