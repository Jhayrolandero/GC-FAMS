import { createReducer, on } from "@ngrx/store";
import { ProfileState } from "../../services/Interfaces/profileState";
import * as ProfileActions from "./profile.action";

export const initialState: ProfileState = {
  isLoading: false,
  profile: {
    faculty_ID: -1,
    college_ID: -1,
    college_name: '',
    college_abbrev: '',
    teaching_position: '',
    isAdmin: false,
    first_name: '',
    last_name: '',
    birthdate: new Date(),
    age: -1,
    citizenship: '',
    civil_status: '',
    sex: '',
    email: '',
    employment_status: false,
    phone_number: '',
    middle_name: '',
    ext_name: '',
    region: '',
    province: '',
    language: '',
    city: '',
    barangay: '',
    profile_image: '',
    cover_image: ''
  },
  error: null
}


export const profileReducer = createReducer(
  initialState,
  on(ProfileActions.getProfile, (state) => ({ ...state, isLoading: true })),
  on(ProfileActions.getProfileSuccess, (state, action) => ({
    ...state,
    isLoading: true,
    profile: action.profile
  })),
  on(ProfileActions.getProfileFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  })),
)
