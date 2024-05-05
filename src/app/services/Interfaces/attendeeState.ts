import { Attendee } from "./attendee";
import { Dictionary } from "./dictionary";

export interface AttendeeState {
  isLoading: boolean;
  attendees: Dictionary<Attendee[]>;
  error: string | null
}
