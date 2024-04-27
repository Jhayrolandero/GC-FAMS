import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { FacultyRequestService } from "../../services/faculty/faculty-request.service";
import * as CommexActions from "./commex.action";
import { EMPTY, Observable, catchError, exhaustMap, filter, from, map, merge, mergeMap, of, tap, withLatestFrom } from "rxjs";
import { CommunityExtension } from "../../services/Interfaces/community-extension";
import { error } from "console";
import { getAttendeeNumber } from "../attendee/attendee.action";
import { AttendeeNumberState } from "../../services/Interfaces/attendeeNumberState";
import { CommexState } from "../../services/Interfaces/commexState";
import { parsedCollegeCommexSelector, parsedCommexSelector } from "./commex.selector";

@Injectable()

export class CommexsEffects {

  // postCommex$: Observable<CommunityExtension>
  constructor(
    private actions$: Actions,
    private facultyService: FacultyRequestService,
    private commexFacultyStore: Store<{ commexs: CommexState }>,
    private commexCollegeStore: Store<{ collegeCommexs: CommexState }>,
  ) {
  }

  fetchCommex$ = (URI: string): Observable<CommunityExtension[]> => {
    return this.facultyService.fetchData<CommunityExtension[]>(URI)
  }

  getCommexs = createEffect(() => this.actions$.pipe(
    ofType(CommexActions.getCommex),
    tap(() => console.log("Hallo :D")),
    withLatestFrom(this.commexFacultyStore.select(parsedCommexSelector)),
    exhaustMap(([action, commexes]) => {

      if (commexes.length <= 0) {
        return this.fetchCommex$(action.uri).
          pipe(
            tap(() => console.log("Hello")),
            map(commexs => CommexActions.getCommexSuccess({ commexs })),
            catchError(error => of(CommexActions.getCommexFailure({ error: error.message }))),
          )
      } else {
        this.commexFacultyStore.dispatch(CommexActions.setLoading({ status: false }))
        return EMPTY
      }
    })
  ))

  getCollegeCommexs = createEffect(() => this.actions$.pipe(
    ofType(CommexActions.getCollegeCommex),
    withLatestFrom(this.commexCollegeStore.select(parsedCollegeCommexSelector)),
    exhaustMap(([action, commexes]) => {
      if (commexes.length <= 0) {

        return this.fetchCommex$(action.uri).
          pipe(
            map(commexs => CommexActions.getCollegeCommexSuccess({ commexs })),
            catchError(error => of(CommexActions.getCollegeCommexFailure({ error: error.message }))),
          )
      } else {

        this.commexCollegeStore.dispatch(CommexActions.setCollegeLoading({ status: false }))
        return EMPTY
      }
    })
  ))


  postCommex$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommexActions.postCommex),
      exhaustMap((action) => {
        return this.facultyService.
          postData2<CommunityExtension>(action.commex, 'addCommex').pipe(
            map(commex => CommexActions.postCommexSuccess({ commex })),
            catchError(err => of(CommexActions.postCommexFailure({ error: err })))
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
