import { createReducer, on } from "@ngrx/store";
import { AttendeeNumberState } from "../../services/Interfaces/attendeeNumberState";
import * as AttendeeActions from "./attendee.action";
import { AttendeeState } from "../../services/Interfaces/attendeeState";
import { create } from "domain";
import { AttendedState } from "../../services/Interfaces/attendedState";
import { Dictionary } from "../../services/Interfaces/dictionary";

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
  }))
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
  })),
  on(AttendeeActions.leaveCommexSuccess, (state, action) => ({
    ...state,
    attendees: reduceAttendeeNumber(state.attendees, action.commex_ID)
  })),
  on(AttendeeActions.joinCommexSuccess, (state, action) => ({
    ...state,
    attendees: incrementAttendeeNumber(state.attendees, action.commex_ID)
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

function reduceAttendeeNumber(attendee: Dictionary<number>, commex_ID: number) {
  const attendeeCopy = { ...attendee }
  let reduceDict = attendeeCopy[commex_ID]
  reduceDict -= 1
  attendeeCopy[commex_ID] = reduceDict
  return attendeeCopy
}

function incrementAttendeeNumber(attendee: Dictionary<number>, commex_ID: number) {
  const attendeeCopy = { ...attendee }
  let incDict = attendeeCopy[commex_ID]
  incDict += 1
  attendeeCopy[commex_ID] = incDict
  return attendeeCopy
}

/*
const updatedAttendee = { ...attendee }; // Create a copy of the input object
const currentCount = updatedAttendee[commex_ID] || 0; // Get current count or default to 0
const updatedCount = Math.max(0, currentCount - 1); // Ensure count does not go below 0
updatedAttendee[commex_ID] = updatedCount; // Update the value in the copied object
return updatedAttendee; // Return the updated object
*/
