import { createReducer, on } from "@ngrx/store";
import { AttendeeNumberState } from "../../services/Interfaces/attendeeNumberState";
import * as AttendeeActions from "./attendee.action";
import { AttendeeState } from "../../services/Interfaces/attendeeState";

export const initialAttendeeNumberState: AttendeeNumberState = {
  isLoading: false,
  attendees: {},
  error: null
}

export const initialAttendeeState: AttendeeState = {
  isLoading: false,
  attendees: {},
  error: null
}
export const attendeeNumberReducer = createReducer(
  initialAttendeeNumberState,
  on(AttendeeActions.getAttendeeNumber, (state) => ({
    ...state,
    isLoading: true
  })),
  on(AttendeeActions.getAttendeeNumberSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    attendees: {
      ...state.attendees,
      ...action.attendees
    }
  })),
  on(AttendeeActions.getAttendeeNumberFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  })),
  on(AttendeeActions.setLoading, (state, action) => ({
    ...state,
    isLoading: action.status
  }))
)

export const attendeeReducer = createReducer(
  initialAttendeeState,
  on(AttendeeActions.getAttendee, (state) => ({
    ...state,
    isLoading: true
  })),
  on(AttendeeActions.getAttendeeSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    attendees: {
      ...state.attendees,
      ...action.attendees
    }
  })),
  on(AttendeeActions.getAttendeeFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  }))
)

