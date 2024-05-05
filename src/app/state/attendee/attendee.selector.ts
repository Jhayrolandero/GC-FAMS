import { createSelector } from "@ngrx/store";
import { AttendeeNumberState } from "../../services/Interfaces/attendeeNumberState";
import { Attendee } from "../../services/Interfaces/attendee";
import { Dictionary } from "../../services/Interfaces/dictionary";
import { AttendedState } from "../../services/Interfaces/attendedState";

interface AppAttendeesNumberState {
  attendees: AttendeeNumberState
}

interface AppAttendedState {
  attended: AttendedState
}

export const attendeeFeature = (state: AppAttendeesNumberState) => state.attendees

export const attendedFeature = (state: AppAttendedState) => state.attended

// export const attendeeNumberSelector = (props : {id : number}) => createSelector(
//   (state) => state.attendees
// )


export const attendeeNumberSelector = createSelector(attendeeFeature,
  (state) => state.attendees
);


export const attendeeLoadingSelector = createSelector(attendeeFeature,
  (state) => state.isLoading
)


export const attendedSelector = createSelector(attendedFeature,
  (state) => state.attended
);


export const attendedLoadingSelector = createSelector(attendedFeature,
  (state) => state.isLoading
)




// export const isAttendeeSelector = (faculty_ID: number, commex_ID: number) => createSelector(attendeeFeature,
//   (state) => checkAttendee(state.attendees, faculty_ID, commex_ID)
// )

// function checkAttendee(attendees: Dictionary<number>, faculty_ID: number, commex_ID: number) {

//   return attendees[commex_ID].includes(faculty_ID)
// }
