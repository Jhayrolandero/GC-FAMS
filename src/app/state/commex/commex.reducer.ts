import { createReducer, on } from "@ngrx/store";
import { CommexState } from "../../services/Interfaces/commexState";
import * as CommexActions from "./commex.action";

// For Faculty
export const initialState: CommexState = {
  isLoading: false,
  commexs: [],
  error: null
}
// For Colleges
export const initialCollegeXCommexState: CommexState = {
  isLoading: false,
  commexs: [],
  error: null
}

export const commexReducer = createReducer(
  initialState,
  on(CommexActions.getCommex, (state) => ({ ...state, isLoading: true })),
  on(CommexActions.getCommexSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    commexs: action.commexs
  })),
  on(CommexActions.getCommexFailure, (state, action) => ({
    ...state,
    isLoading: true,
    error: action.error
  })),
  on(CommexActions.postCommexSuccess, (state, action) => (
    {
      ...state,
      commexs: [...state.commexs, action.commex]
    }
  ))
)

export const collegeCommexReducer = createReducer(
  initialCollegeXCommexState,
  on(CommexActions.getCommex, (state) => ({ ...state, isLoading: true })),
  on(CommexActions.getCollegeCommexSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    commexs: action.commexs
  })),
  on(CommexActions.getCollegeCommexFailure, (state, action) => ({
    ...state,
    isLoading: true,
    error: action.error
  }))
)
