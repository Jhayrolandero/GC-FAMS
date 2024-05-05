import { Attendee } from "./attendee";
import { Dictionary } from "./dictionary";

export interface AttendeeNumberState {
  isLoading: boolean;
  attendees: Dictionary<number>;
  error: Error | null
}
