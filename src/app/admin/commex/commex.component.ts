import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CommunityExtension } from '../../services/Interfaces/community-extension';
import * as CommexActions from '../../state/commex/commex.action';
import { Observable } from 'rxjs';
import * as CommexsSelector from '../../state/commex/commex.selector';
import { CommexState } from '../../services/Interfaces/commexState';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commex',
  standalone: true,
  imports: [LoadingScreenComponent, CommonModule],
  templateUrl: './commex.component.html',
  styleUrl: './commex.component.css'
})
export class CommexComponent {


  // commexs$: Observable<CommunityExtension[]>
  // isLoading$: Observable<boolean>
  constructor(private store: Store<{ commexs: CommunityExtension[] }>) {

    // this.commexs$ = store.pipe(select(CommexsSelector.commexsSelector))
    // this.isLoading$ = store.pipe(select(CommexsSelector.isLoadingSelector))
  }



  ngOnInit() {
    this.store.dispatch(CommexActions.getCommex())
  }
}
