import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { FacultyRequestService } from "../../services/faculty/faculty-request.service";
import * as CommexActions from "./commex.action";
import { Observable, catchError, exhaustMap, from, map, merge, mergeMap, of } from "rxjs";
import { CommunityExtension } from "../../services/Interfaces/community-extension";
import { error } from "console";
import { getAttendeeNumber } from "../attendee/attendee.action";
import { AttendeeNumberState } from "../../services/Interfaces/attendeeState";

@Injectable()

export class CommexsEffects {

  // postCommex$: Observable<CommunityExtension>
  constructor(
    private actions$: Actions,
    private facultyService: FacultyRequestService,
    private attendeeStore: Store<{ attendees: AttendeeNumberState }>

  ) {
    // this.fetchCommex$ = (uri: string) => this.facultyService.fetchData<CommunityExtension[]>('getcommex?t=faculty')
    // this.postCommex$ = this.facultyService.postData<CommunityExtension>(action.commex, 'getCommex')
  }

  fetchCommex$ = (URI: string): Observable<CommunityExtension[]> => {
    return this.facultyService.fetchData<CommunityExtension[]>(URI)
  }

  getCommexs = createEffect(() => this.actions$.pipe(
    ofType(CommexActions.getCommex),
    exhaustMap((action) => {
      return this.fetchCommex$(action.uri).
        pipe(
          map(commexs => CommexActions.getCommexSuccess({ commexs })),
          catchError(error => of(CommexActions.getCommexFailure({ error: error.message }))),
        )
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
