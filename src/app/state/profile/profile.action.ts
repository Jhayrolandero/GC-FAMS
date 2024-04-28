import { createAction, props } from "@ngrx/store";
import { Profile } from "../../services/Interfaces/profile";

export const getProfile = createAction('[Profile] Fetch Profile')

export const getProfileSuccess = createAction('[Profile] Fetch Profile Success',
  props<{ profile: Profile }>()
)

export const getProfileFailure = createAction('[Profile] Fetch Profile Failure',
  props<{ error: string }>())

