import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY, Observable, catchError, map, mergeMap, of, withLatestFrom } from "rxjs";
import { Attended } from "../../services/Interfaces/attended";
import { AttendedState } from "../../services/Interfaces/attendedState";
import { Attendee } from "../../services/Interfaces/attendee";
import { AttendeeCount } from "../../services/Interfaces/attendeeCount";
import { AttendeeNumberState } from "../../services/Interfaces/attendeeNumberState";
import { Encryption } from "../../services/Interfaces/encryption";
import { Response } from "../../services/Interfaces/response";
import { CryptoJSService } from "../../services/crypto-js.service";
import { FacultyRequestService } from "../../services/faculty/faculty-request.service";
import * as AttendeeActions from "./attendee.action";
import { attendedSelector, attendeeNumberSelector } from "./attendee.selector";
import { NumberCardComponent } from "@swimlane/ngx-charts";
import { CommexState } from "../../services/Interfaces/commexState";
import { deleteCommexSuccess, getCommex } from "../commex/commex.action";
import { commexSelectorOne } from "../commex/commex.selector";
import { CommunityExtension } from "../../services/Interfaces/community-extension";
@Injectable()


export class AttendeeEffects {

  commex!: CommunityExtension

  constructor(
    private actions$: Actions,
    private facultyService: FacultyRequestService,
    private attendeeStore: Store<{ attendees: AttendeeNumberState }>,
    private attendedStore: Store<{ attended: AttendedState }>,
    private commexFacultyStore: Store<{ commexs: CommexState }>,
    private cryptoJS: CryptoJSService
  ) { }

  decryptData<T>(ciphertext: Encryption): T {
    return this.cryptoJS.CryptoJSAesDecrypt<T>("ucj7XoyBfAMt/ZMF20SQ7sEzad+bKf4bha7bFBdl2HY=", ciphertext)
  }


  fetchAttendeeNumber$ = (id: number): Observable<Encryption> => {
    return this.facultyService.fetchData<Encryption>(`attendee/${id}?q=number`)
  }

  fetchAttendee$ = (id: number): Observable<Response<Attendee[]>> => {
    return this.facultyService.fetchData<Response<Attendee[]>>(`attendee/${id}`)
  }

  fetchAttended$ = (commex_ID: number): Observable<Encryption> => {
    return this.facultyService.fetchData<Encryption>(`attendee/${commex_ID}?q=check`)
  }

  leaveCommex$ = (commex_ID: number) => {
    return this.facultyService.deleteData(`attendee/${commex_ID}`)
  }

  joinCommex$ = (formData: FormData) => {
    return this.facultyService.postData(formData, `attendee`)
  }

  postAttendee = createEffect(() => this.actions$.pipe(
    ofType(AttendeeActions.joinCommex),
    mergeMap((action) => {
      return this.joinCommex$(action.formData).pipe(
        map(() => {
          this.attendeeStore.dispatch(AttendeeActions.getAttendedSuccess({ attended: { [action.commex_ID]: 1 } }))
          this.attendeeStore.dispatch(AttendeeActions.setAttendedLoading({ status: false}))
          return AttendeeActions.joinCommexSuccess({ commex_ID: action.commex_ID, commex: action.commex })
        }),
        catchError(err => of(AttendeeActions.joinCommexFailure({ error: err.message })))
      )
    })
  ))


  deleteAttendee = createEffect(() => this.actions$.pipe(
    ofType(AttendeeActions.leaveCommex),
    mergeMap((action) => {
      return this.leaveCommex$(action.commex_ID).pipe(
        map(() => {
          this.attendeeStore.dispatch(AttendeeActions.getAttendedSuccess({
             attended: { [action.commex_ID]: 0 },
            }))

            this.attendeeStore.dispatch(AttendeeActions.setAttendedLoading({ status: false}))
            // Delete the commex from the display
            this.commexFacultyStore.dispatch(deleteCommexSuccess({ commex_ID : action.commex_ID}))
            return AttendeeActions.leaveCommexSuccess({
            commex_ID: action.commex_ID
          })
        }),
        catchError(err =>  {

          this.attendeeStore.dispatch(AttendeeActions.setAttendedLoading({ status: false}))

        return of(AttendeeActions.leaveCommexFailure({ error: err.message }))
        }
      )
      )
    })
  ))

  // Is already joined
  getAttended = createEffect(() => this.actions$.pipe(
    ofType(AttendeeActions.getAttended),
    withLatestFrom(this.attendedStore.select(attendedSelector)),
    mergeMap(([action, attended]) => {
      if (!(action.commex_ID in attended)) {
        return this.fetchAttended$(action.commex_ID).pipe(
          map(data => AttendeeActions.getAttendedSuccess({ attended: { [action.commex_ID]: this.decryptData<Response<Attended[]>>(data).data[0].attended } })),
          catchError(err => of(AttendeeActions.getAttendedFailure({ error: err.message })))
        )
      } else {
        this.attendeeStore.dispatch(AttendeeActions.setAttendedLoading({ status: false }))
        return EMPTY
      }
    })
  ))

  // How many
  getAttendeeNumber = createEffect(() => this.actions$.pipe(
    ofType(AttendeeActions.getAttendeeNumber),
    withLatestFrom(this.attendeeStore.select(attendeeNumberSelector)),
    mergeMap(([action, attendeesNumber]) => {
      // Check first if id exist
      if (!(action.id in attendeesNumber)) {
        return this.fetchAttendeeNumber$(action.id).
          pipe(
            map(data => AttendeeActions.getAttendeeNumberSuccess({ attendees: { [action.id]: this.decryptData<Response<AttendeeCount[]>>(data).data[0].count } })),
            catchError(err => of(AttendeeActions.getAttendeeNumberFailure({ error: err })))
          )
      } else {
        this.attendeeStore.dispatch(AttendeeActions.setLoading({ status: false }))
        return EMPTY
      }

    })
  ))


  getAttendee = createEffect(() => this.actions$.pipe(
    ofType(AttendeeActions.getAttendee),
    mergeMap((action) => {
      return this.fetchAttendee$(action.id).
        pipe(map(attendees => AttendeeActions.getAttendeeSuccess({ attendees: { [action.id]: attendees.data } })),
          catchError(err => of(AttendeeActions.getAttendeeFailure({ error: err.message })))
        )
    })
  ))


}
