import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { FacultyRequestService } from "../../services/faculty/faculty-request.service";
import * as CommexActions from "./commex.action";
import { Observable, catchError, exhaustMap, map, mergeMap, of } from "rxjs";
import { CommunityExtension } from "../../services/Interfaces/community-extension";

@Injectable()

export class CommexsEffects {

  fetchCommex$: Observable<CommunityExtension[]>
  constructor(
    private actions$: Actions,
    private facultyService: FacultyRequestService
  ) {

    this.fetchCommex$ = this.facultyService.fetchData<CommunityExtension[]>('getcommex?t=all')
  }


  getCommexs = createEffect(() => this.actions$.pipe(
    ofType(CommexActions.getCommex),
    exhaustMap(() => {
      return this.fetchCommex$.
        pipe(map(commexs => CommexActions.getCommexSuccess({ commexs })),
          catchError(error =>
            of(
              CommexActions.getCommexFailure({
                error: error.message
              })
            )
          )
        )
    }
    )
  ))


}
