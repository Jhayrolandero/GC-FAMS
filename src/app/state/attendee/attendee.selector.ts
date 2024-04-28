import { createSelector } from "@ngrx/store";
import { AttendeeNumberState } from "../../services/Interfaces/attendeeNumberState";

interface AppAttendeesNumberState {
  attendees: AttendeeNumberState
}


export const attendeeFeature = (state: AppAttendeesNumberState) => state.attendees

// export const attendeeNumberSelector = (props : {id : number}) => createSelector(
//   (state) => state.attendees
// )


export const attendeeNumberSelector = createSelector(attendeeFeature,
  (state) => state.attendees
);


export const attendeeLoadingSelector = createSelector(attendeeFeature,
  (state) => state.isLoading
)
