import { Injectable } from "@angular/core";
import { EMPTY, Observable, catchError, concatMap, exhaustMap, filter, map, mergeMap, of, take, tap, withLatestFrom } from "rxjs";
import { Attendee } from "../../services/Interfaces/attendee";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FacultyRequestService } from "../../services/faculty/faculty-request.service";
import * as AttendeeActions from "./attendee.action";
import { AttendeeCount } from "../../services/Interfaces/attendeeCount";
import { Response } from "../../services/Interfaces/response";
import { Store } from "@ngrx/store";
import { AttendeeNumberState } from "../../services/Interfaces/attendeeNumberState";
import { attendedSelector, attendeeNumberSelector } from "./attendee.selector";
import { Attended } from "../../services/Interfaces/attended";
import { AttendedState } from "../../services/Interfaces/attendedState";
@Injectable()


export class AttendeeEffects {


  constructor(
    private actions$: Actions,
    private facultyService: FacultyRequestService,
    private attendeeStore: Store<{ attendees: AttendeeNumberState }>,
    private attendedStore: Store<{ attended: AttendedState }>,
  ) { }

  fetchAttendeeNumber$ = (id: number): Observable<Response<AttendeeCount[]>> => {
    return this.facultyService.fetchData<Response<AttendeeCount[]>>(`attendee/${id}?q=number`)
  }

  fetchAttendee$ = (id: number): Observable<Response<Attendee[]>> => {
    return this.facultyService.fetchData<Response<Attendee[]>>(`attendee/${id}`)
  }

  fetchAttended$ = (commex_ID: number, faculty_ID: number): Observable<Response<Attended[]>> => {
    return this.facultyService.fetchData<Response<Attended[]>>(`attendee/${faculty_ID}/commex/${commex_ID}?q=check`)
  }

  leaveCommex$ = (commex_ID: number, faculty_ID: number) => {
    return this.facultyService.deleteData(`attendee/${faculty_ID}/commex/${commex_ID}`)
  }

  joinCommex$ = (formData: FormData) => {
    return this.facultyService.postData(formData, `test`)
  }

  postAttendee = createEffect(() => this.actions$.pipe(
    ofType(AttendeeActions.joinCommex),
    mergeMap((action) => {
      return this.joinCommex$(action.formData).pipe(
        map(() => {
          this.attendeeStore.dispatch(AttendeeActions.getAttendedSuccess({ attended: { [action.commex_ID]: 1 } }))
          return AttendeeActions.joinCommexSuccess({ commex_ID: action.commex_ID })
          // return AttendeeActions.getAttendedSuccess({ attended: { [action.commex_ID]: 1 } })
        }),
        catchError(err => of(AttendeeActions.joinCommexFailure({ error: err.message })))
      )
    })
  ))


  deleteAttendee = createEffect(() => this.actions$.pipe(
    ofType(AttendeeActions.leaveCommex),
    mergeMap((action) => {
      return this.leaveCommex$(action.commex_ID, action.faculty_ID).pipe(
        map(() => {
          this.attendeeStore.dispatch(AttendeeActions.getAttendedSuccess({ attended: { [action.commex_ID]: 0 } }))
          return AttendeeActions.leaveCommexSuccess({ commex_ID: action.commex_ID })
        }),
        catchError(err => of(AttendeeActions.leaveCommexFailure({ error: err.message })))
      )
    })
  ))

  getAttended = createEffect(() => this.actions$.pipe(
    ofType(AttendeeActions.getAttended),
    withLatestFrom(this.attendedStore.select(attendedSelector)),
    mergeMap(([action, attended]) => {
      if (!(action.commex_ID in attended)) {
        return this.fetchAttended$(action.commex_ID, action.faculty_ID).pipe(
          map(attendee => AttendeeActions.getAttendedSuccess({ attended: { [action.commex_ID]: attendee.data[0].attended } })),
          catchError(err => of(AttendeeActions.getAttendedFailure({ error: err.message })))
        )
      } else {
        this.attendeeStore.dispatch(AttendeeActions.setAttendedLoading({ status: false }))
        return EMPTY
      }
    })
  ))

  getAttendeeNumber = createEffect(() => this.actions$.pipe(
    ofType(AttendeeActions.getAttendeeNumber),
    withLatestFrom(this.attendeeStore.select(attendeeNumberSelector)),
    mergeMap(([action, attendeesNumber]) => {
      // Check first if id exist
      if (!(action.id in attendeesNumber)) {
        return this.fetchAttendeeNumber$(action.id).
          pipe(
            map(attendees => AttendeeActions.getAttendeeNumberSuccess({ attendees: { [action.id]: attendees.data[0].count } })),
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
