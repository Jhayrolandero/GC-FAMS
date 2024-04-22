import { createReducer, on } from "@ngrx/store";
import { AttendeeNumberState } from "../../services/Interfaces/attendeeState";
import * as AttendeeActions from "./attendee.action";

export const initialAttendeeNumberState: AttendeeNumberState = {
  isLoading: false,
  attendees: [],
  error: null
}

export const attendeeReducer = createReducer(
  initialAttendeeNumberState,
  on(AttendeeActions.getAttendeeNumber, (state) => ({
    ...state,
    isLoading: true
  })),
  on(AttendeeActions.getAttendeeNumberSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    attendees: [...state.attendees, action.attendees]
  })),
  on(AttendeeActions.getAttendeeNumberFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  }))
)
