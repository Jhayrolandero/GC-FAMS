import { Attendee } from "./attendee";
import { Dictionary } from "./dictionary";

export interface AttendedState {
  isLoading: boolean;
  attended: Dictionary<AttendedStatus>;
  error: string | null
}


export interface AttendedStatus {
  isAttended: number;
  isLoading: boolean
}
