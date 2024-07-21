import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Expertise } from '../../../../services/Interfaces/expertise';
import { FacultyRequestService } from '../../../../services/faculty/faculty-request.service';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { filterExpertiseSelector, selectFacultyExpertise } from '../../../../state/faculty-state/faculty-state.selector';
import { loadExpertise } from '../../../../state/faculty-state/faculty-state.actions';
import { MessageService } from '../../../../services/message.service';
import { Router } from '@angular/router';
import { ExpertiseFaculty } from '../../../../services/Interfaces/expertise-faculty';

@Component({
  selector: 'app-faculty-expertise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-expertise.component.html',
  styleUrl: './faculty-expertise.component.css'
})
export class FacultyExpertiseComponent {
  @Output() editEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();

  public expertise$ = this.store.select(selectFacultyExpertise);
  expertiseArr: ExpertiseFaculty[] = []
  router = inject(Router);

  @Input('startDate') startDate: string = ''
  @Input('endDate') endDate: string = ''

  constructor(
    private facultyRequest: FacultyRequestService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private store: Store){}

  ngOnChanges(changes: SimpleChanges): void {

    if(!this.startDate || !this.endDate) return
    this.store.select(filterExpertiseSelector(this.startDate, this.endDate)).subscribe(res => this.expertiseArr = res)
  }


  selectCv(educ: any){
    this.facultyRequest.patchData([5, educ], 'selectCv').subscribe({
      next: (next: any) => {console.log(next);},
      error: (error) => {console.log(error);},
      complete: () => {
        this.store.dispatch(loadExpertise());
        this.messageService.sendMessage("Record added to CV.", 1)
      }
    });
  }

  editExpertise(value: Expertise){
    this.editEvent.emit(value);
  }

  deleteExpertise(id: number){
    this.deleteEvent.emit(['deleteSpec/' + id, 4]);
  }

  navigateUrl(id: number) {
    this.router.navigate(['faculty/expertise', id])
  }

}
