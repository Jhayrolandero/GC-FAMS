import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CommunityExtension } from '../../services/Interfaces/community-extension';
import * as CommexActions from '../../state/commex/commex.action';
import { Observable } from 'rxjs';
import * as CommexsSelector from '../../state/commex/commex.selector';
import { CommexState } from '../../services/Interfaces/commexState';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { CommonModule } from '@angular/common';
import { OtherCommexComponent } from '../../faculty/community-extensions/other-commex/other-commex.component';
import { TooltipComponent } from '../../components/tooltip/tooltip.component';
import { MatDialog } from '@angular/material/dialog';
import { CommexFormComponent } from '../../faculty/community-extensions/community-extensions.component';

@Component({
  selector: 'app-commex',
  standalone: true,
  imports: [
    LoadingScreenComponent,
    CommonModule,
    OtherCommexComponent,
    TooltipComponent
  ],
  templateUrl: './commex.component.html',
  styleUrl: './commex.component.css'
})
export class CommexComponent {


  commexs$: Observable<CommunityExtension[]>
  latestCommex$: Observable<CommunityExtension>
  isLoading$: Observable<boolean>
  constructor(
    private store: Store<{ commexs: CommexState }>,
    public dialog: MatDialog,
  ) {

    this.commexs$ = this.store.pipe(select(CommexsSelector.parsedCommexSelector))
    this.isLoading$ = this.store.pipe(select(CommexsSelector.isLoadingSelector))
    this.latestCommex$ = this.store.pipe(select(CommexsSelector.latestCommexSelector))
  }


  ngOnInit() {
    this.store.dispatch(CommexActions.getCommex())
  }

  openDialog() {
    this.dialog.open(CommexFormComponent)
  }

}
