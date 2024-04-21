import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { FacultyRequestService } from "../../services/faculty/faculty-request.service";
import * as CommexActions from "./commex.action";
import { Observable, catchError, exhaustMap, map, mergeMap, of } from "rxjs";
import { CommunityExtension } from "../../services/Interfaces/community-extension";
import { error } from "console";

@Injectable()

export class CommexsEffects {

  fetchCommex$: Observable<CommunityExtension[]>
  // postCommex$: Observable<CommunityExtension>
  constructor(
    private actions$: Actions,
    private facultyService: FacultyRequestService
  ) {
    this.fetchCommex$ = this.facultyService.fetchData<CommunityExtension[]>('getcommex?t=all')
    // this.postCommex$ = this.facultyService.postData<CommunityExtension>(action.commex, 'getCommex')
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
          ))
    })
  ))

  postCommex$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommexActions.postCommex),
      exhaustMap((action) => {
        return this.facultyService.
          postData2<CommunityExtension>(action.commex, 'addCommex').pipe(
            map(commex => CommexActions.postCommexSuccess({ commex })),
            catchError(err => of(CommexActions.postCommexFailure({ error: err.message })))
          )
      })
    )
  })

  // postCommex = createEffect(() => this.actions$.pipe(
  //   ofType(CommexActions.postCommex),
  //   exhaustMap((action) =>
  //     this.facultyService.postData(action.commex, 'getCommex')
  //   )
  // ))


  // exhaustMap(value => {
  //   this.facultyService.postData<CommunityExtension>(action.commex, 'addCommex')
  // }

}
