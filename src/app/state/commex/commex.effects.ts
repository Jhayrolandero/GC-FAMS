import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { FacultyRequestService } from "../../services/faculty/faculty-request.service";
import * as CommexActions from "./commex.action";
import { EMPTY, Observable, catchError, concatMap, exhaustMap, map, mergeMap, of, tap, withLatestFrom } from "rxjs";
import { CommunityExtension } from "../../services/Interfaces/community-extension";
import { CommexState } from "../../services/Interfaces/commexState";
import { parsedCollegeCommexSelector, parsedCommexSelector } from "./commex.selector";
import { MessageService } from "../../services/message.service";
import { AttendedState } from "../../services/Interfaces/attendedState";
import { getAttended } from "../attendee/attendee.action";
import { CryptoJSService } from "../../services/crypto-js.service";
import { Encryption } from "../../services/Interfaces/encryption";
@Injectable()

export class CommexsEffects {

  // postCommex$: Observable<CommunityExtension>
  constructor(
    private actions$: Actions,
    private facultyService: FacultyRequestService,
    private commexFacultyStore: Store<{ commexs: CommexState }>,
    private commexCollegeStore: Store<{ collegeCommexs: CommexState }>,
    private messageService: MessageService,
    private attendedStore: Store<{ attended: AttendedState }>,
    private cryptoJS: CryptoJSService
  ) {
  }


  decryptData<T>(ciphertext: Encryption): T {
    return this.cryptoJS.CryptoJSAesDecrypt<T>("ucj7XoyBfAMt/ZMF20SQ7sEzad+bKf4bha7bFBdl2HY=", ciphertext)
  }

  fetchCommex$(URI: string) {
    return this.facultyService.fetchData<Encryption>(URI)
  }

  removeCommex$ = (commex_ID: number) => {
    return this.facultyService.deleteData(`commex/${commex_ID}`)
  }

  deleteCommex = createEffect(() => this.actions$.pipe(
    ofType(CommexActions.deleteCommex),
    mergeMap((action) => {

      if (action.view === 'faculty') {

        return this.removeCommex$(action.commex_ID).pipe(
          map(() => CommexActions.deleteCommexSuccess({ commex_ID: action.commex_ID })),
          catchError(error => of(CommexActions.deleteCommexFailure({ error: error.message })))
        )
      } else {
        return this.removeCommex$(action.commex_ID).pipe(
          map(() => CommexActions.deleteCollegeCommexSuccess({ commex_ID: action.commex_ID })),
          catchError(error => of(CommexActions.deleteCollegeCommexFailure({ error: error.message })))
        )
      }
    })
  ))

  getCommexs = createEffect(() => this.actions$.pipe(
    ofType(CommexActions.getCommex),
    tap(() => console.log("Hallo :D")),
    withLatestFrom(this.commexFacultyStore.select(parsedCommexSelector)),
    concatMap(([action, commexes]) => {
      if (commexes.length <= 0) {
        return this.fetchCommex$(action.uri).
          pipe(
            map(data => {
              const commexs = this.decryptData<CommunityExtension[]>(data)

              commexs.forEach(commex => this.attendedStore.dispatch(getAttended({ commex_ID: commex.commex_ID })))

              return CommexActions.getCommexSuccess({ commexs })
            }),
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
    concatMap(([action, commexes]) => {
      if (commexes.length <= 0) {

        return this.fetchCommex$(action.uri).
          pipe(
            tap((commexes) => console.log('College Community Extension has loaded:', commexes)),
            map(data => {
              const commexs = this.decryptData<CommunityExtension[]>(data)

              commexs.forEach(commex => this.attendedStore.dispatch(getAttended({ commex_ID: commex.commex_ID })))
              return CommexActions.getCollegeCommexSuccess({ commexs })
            }),
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
      tap(() => this.messageService.sendMessage("Posting Commex", 0)),
      exhaustMap((action) => {
        return this.facultyService.
          postData2<CommunityExtension>(action.commex, 'addCommex').pipe(
            map(commex => {
              this.messageService.sendMessage("Commex post successfully!", 1)
              return CommexActions.postCommexSuccess({ commex })
            }
            ),
            catchError(err => {
              this.messageService.sendMessage("Error in posting commex!", -1)
              return of(CommexActions.postCommexFailure({ error: err }))
            })
          )
      })
    )
  })
}
