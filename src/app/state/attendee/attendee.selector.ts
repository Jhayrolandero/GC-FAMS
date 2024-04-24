import { createSelector } from "@ngrx/store";
import { AttendeeNumberState } from "../../services/Interfaces/attendeeState";

interface AppState {
  attendeeNumber: AttendeeNumberState
}


export const selectFeature = (state: AppState) => state.attendeeNumber

export const attendeeNumberSelector = createSelector(selectFeature,
  (state) => state.attendees
)
