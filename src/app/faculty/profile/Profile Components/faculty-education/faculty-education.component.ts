import { Component, Input, Output, SimpleChanges, inject } from '@angular/core';
import { EducationalAttainment } from '../../../../services/Interfaces/educational-attainment';
import { CommonModule } from '@angular/common';
import { FacultyRequestService } from '../../../../services/faculty/faculty-request.service';
import { MatDialog } from '@angular/material/dialog';
import { EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { filterEducSelector, selectAllEduc } from '../../../../state/faculty-state/faculty-state.selector';
import { loadEduc } from '../../../../state/faculty-state/faculty-state.actions';
import { MessageService } from '../../../../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faculty-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-education.component.html',
  styleUrl: './faculty-education.component.css'
})
export class FacultyEducationComponent {
  @Output() editEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();

  @Input('startDate') startDate: string = ''
  @Input('endDate') endDate: string = ''

  educsArr: EducationalAttainment[] = []
  public education$ = this.store.select(selectAllEduc);
  // public educationFiltered$ = this.store.select(filterEducSelector(this.startDate, this.endDate));
  router = inject(Router);

  constructor(
    private facultyRequest: FacultyRequestService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private store: Store
  ){}

  ngOnChanges(changes: SimpleChanges): void {

    if(!this.startDate || !this.endDate) return
    this.store.select(filterEducSelector(this.startDate, this.endDate)).subscribe(res => this.educsArr = res)
  }

  selectCv(educ: any){
    this.facultyRequest.patchData([1, educ], 'selectCv').subscribe({
      next: (next: any) => {console.log(next);},
      error: (error) => {console.log(error);},
      complete: () => {
        this.store.dispatch(loadEduc());
        this.messageService.sendMessage("Record added to CV.", 1)
      }
    });
  }


  editEducation(value: EducationalAttainment){
    this.editEvent.emit(value);
  }

  deleteEducation(id: number){
    this.deleteEvent.emit(['deleteEduc/' + id, 0]);
  }

  navigateUrl(id: number) {
    this.router.navigate(['faculty/educ', id])
  }
}
