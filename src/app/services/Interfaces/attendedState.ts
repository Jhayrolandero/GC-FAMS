import { Attendee } from "./attendee";
import { Dictionary } from "./dictionary";

export interface AttendedState {
  attending: boolean;
  isLoading: boolean;
  attended: Dictionary<number>;
  error: string | null
}


