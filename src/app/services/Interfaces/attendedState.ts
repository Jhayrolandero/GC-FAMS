import { Attendee } from "./attendee";
import { Dictionary } from "./dictionary";

export interface AttendedState {
  isLoading: boolean;
  attended: Dictionary<number>;
  error: string | null
}


