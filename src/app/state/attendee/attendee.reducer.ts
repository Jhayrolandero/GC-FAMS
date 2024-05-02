import { createReducer, on } from "@ngrx/store";
import { AttendeeNumberState } from "../../services/Interfaces/attendeeNumberState";
import * as AttendeeActions from "./attendee.action";
import { AttendeeState } from "../../services/Interfaces/attendeeState";
import { create } from "domain";
import { AttendedState } from "../../services/Interfaces/attendedState";

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

export const initialAttendedState: AttendedState = {
  isLoading: false,
  attended: {},
  error: null
}


export const attendedReducer = createReducer(
  initialAttendedState,
  on(AttendeeActions.getAttended, (state) => ({
    ...state,
    isLoading: true,
    attended: { isLoading: true }
  })),
  on(AttendeeActions.getAttendedSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    attended: { ...state.attended, ...action.attended }
  })),
  on(AttendeeActions.getAttendedFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  })),
  on(AttendeeActions.setAttendedLoading, (state, action) => ({
    ...state,
    isLoading: action.status,
  })),
)


export const attendeeNumberReducer = createReducer(
  initialAttendeeNumberState,
  on(AttendeeActions.getAttendeeNumber, (state) => ({
    ...state,
    isLoading: true
  })),
  on(AttendeeActions.getAttendeeNumberSuccess, (state, action) => ({
    ...state,
    attendees: {
      ...state.attendees,
      ...action.attendees
    },
    isLoading: false,
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

