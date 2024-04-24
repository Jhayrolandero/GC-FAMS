import { Injectable } from "@angular/core";
import { Observable, catchError, exhaustMap, map, mergeMap, of } from "rxjs";
import { Attendee } from "../../services/Interfaces/attendee";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FacultyRequestService } from "../../services/faculty/faculty-request.service";
import * as AttendeeActions from "./attendee.action";
import { AttendeeCount } from "../../services/Interfaces/attendeeCount";
import { Response } from "../../services/Interfaces/response";
@Injectable()


export class AttendeeEffects {


  constructor(
    private actions$: Actions,
    private facultyService: FacultyRequestService
  ) { }

  fetchAttendeeNumber$ = (id: number): Observable<Response<AttendeeCount[]>> => {
    return this.facultyService.fetchData<Response<AttendeeCount[]>>(`attendee/${id}?q=number`)
  }

  fetchAttendee$ = (id: number): Observable<Response<Attendee[]>> => {
    return this.facultyService.fetchData<Response<Attendee[]>>(`attendee/${id}`)
  }

  getAttendeeNumber = createEffect(() => this.actions$.pipe(
    ofType(AttendeeActions.getAttendeeNumber),
    mergeMap((action) => {
      return this.fetchAttendeeNumber$(action.id).
        pipe(map(attendees => AttendeeActions.getAttendeeNumberSuccess({ attendees: { [action.id]: attendees.data[0].count } })),
          catchError(err => of(AttendeeActions.getAttendeeNumberFailure({ error: err.message })))
        )
    })
  ))

  getAttendee = createEffect(() => this.actions$.pipe(
    ofType(AttendeeActions.getAttendee),
    mergeMap((action) => {
      return this.fetchAttendee$(action.id).
        pipe(map(attendees => AttendeeActions.getAttendeeSuccess({ attendees: { [action.id]: attendees.data[0] } })),
          catchError(err => of(AttendeeActions.getAttendeeFailure({ error: err.message })))
        )
    })
  ))
}
