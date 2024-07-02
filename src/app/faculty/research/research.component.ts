import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CryptoJSService } from '../../services/crypto-js.service';
import { FacultyRequestService } from '../../services/faculty/faculty-request.service';
import { MessageService } from '../../services/message.service';
import { ResearchFormComponent } from './research-form/research-form.component';
import { CommonModule } from '@angular/common';
import { throws } from 'assert';
import { loadResearch } from '../../state/faculty-state/faculty-state.actions';
import { selectFacultyResearch, selectFacultyResearchAuthor } from '../../state/faculty-state/faculty-state.selector';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [ResearchFormComponent, CommonModule],
  templateUrl: './research.component.html',
  styleUrl: './research.component.css'
})
export class ResearchComponent {
  research$ = this.store.select(selectFacultyResearch);
  authors$ = this.store.select(selectFacultyResearchAuthor);

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private cryptoJS: CryptoJSService,
    private messageService: MessageService,
    private facultyRequest: FacultyRequestService
  ){

  }

  openLink(url: string){
    console.log(url);
    window.open(url, "_blank");
  }


  openForm() {
    this.dialog.open(ResearchFormComponent)
  }
}
