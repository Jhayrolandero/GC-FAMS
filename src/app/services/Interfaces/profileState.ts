import { Profile } from "./profile";

export interface ProfileState {
  isLoading: boolean;
  profile: Profile;
  error: string | null
}
