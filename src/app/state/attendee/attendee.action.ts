import { createAction, props } from "@ngrx/store";
import { Dictionary } from "../../services/Interfaces/dictionary";
import { Attendee } from "../../services/Interfaces/attendee";
import e from "express";

export const getAttendeeNumber = createAction('[Attendee] Fetch Attendee Number',
  props<{ id: number }>()
)

export const getAttendeeNumberSuccess = createAction('[Attendee] Fetch Attendee Number Success',
  props<{ attendees: Dictionary<number> }>()
)

export const getAttendeeNumberFailure = createAction('[Attendee] Fetch Attendee Number Failure',
  props<{ error: string }>()
)


export const getAttended = createAction('[Attended Commex ] Fetch Commex Attended',
  props<{ commex_ID: number, faculty_ID: number }>()
)

export const getAttendedSuccess = createAction('[Attended Commex ] Fetch Commex Attended Success',
  props<{ attended: Dictionary<number> }>()
)

export const getAttendedFailure = createAction('[Attended Commex ] Fetch Commex Attended Failure',
  props<{ error: string }>()
)

export const setAttendedLoading = createAction('[Attended Commex ] Fetch Commex Attended Done',
  props<{ status: boolean }>()
)

export const setLoading = createAction('[Attendee] Set Load',
  props<{ status: boolean }>()
)

export const getAttendee = createAction('[Attendee] Fetch Attendee',
  props<{ id: number }>()
)



export const getAttendeeSuccess = createAction('[Attendee] Fetch Attendee',
  props<{ attendees: Dictionary<Attendee[]> }>()
)

export const getAttendeeFailure = createAction('[Attendee] Fetch Attendee',
  props<{ error: string }>()
)

export const leaveCommex = createAction('[Attendee Leave] Leave Commex',
  props<{ commex_ID: number, faculty_ID: number }>()
)

export const leaveCommexSuccess = createAction('[Attendee Leave] Leave Commex Success',
  props<{ commex_ID: number }>()
)

export const leaveCommexFailure = createAction('[Attendee Leave] Leave Commex Failure',
  props<{ error: string }>()
)
