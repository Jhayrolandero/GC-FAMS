import { createReducer, on } from "@ngrx/store";
import { CommexState } from "../../services/Interfaces/commexState";
import * as CommexActions from "./commex.action";
import { state } from "@angular/animations";
import { Dictionary } from "../../services/Interfaces/dictionary";
import { CommunityExtension } from "../../services/Interfaces/community-extension";

// For Faculty
export const initialState: CommexState = {
  postLoading: false,
  isLoading: false,
  commexs: [],
  error: '',
  deleteLoading: false
}
// For Colleges
export const initialCollegeXCommexState: CommexState = {
  postLoading: false,
  isLoading: false,
  commexs: [],
  error: null,
  deleteLoading: false
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
    isLoading: false,
    error: action.error
  })),
  on(CommexActions.postCommex, (state) => ({ ...state, postLoading: true })),
  on(CommexActions.postCommexSuccess, (state, action) => (
    {
      ...state,
      commexs: [...state.commexs, action.commex],
      postLoading: false
    }
  )),
  on(CommexActions.postCommexFailure, (state, action) => (
    {
      ...state,
      postLoading: false,
      error: action.error
    }
  )),
  on(CommexActions.setLoading, (state, action) => ({
    ...state,
    isLoading: action.status
  })),
  on(CommexActions.deleteCommex, (state) => ({
    ...state,
    deleteLoading: true
  })),
  on(CommexActions.deleteCommexSuccess, (state, action) => ({
    ...state,
    commexs: removeCommex(state.commexs, action.commex_ID),
    deleteLoading: false
  })),
  on(CommexActions.deleteCommexFailure, (state, action) => (
    {
      ...state,
      deleteLoading: false,
      error: action.error
    }
  )),
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
    isLoading: false,
    error: action.error
  })),
  on(CommexActions.setCollegeLoading, (state, action) => ({
    ...state,
    isLoading: action.status
  }))
)


function removeCommex(commexs: CommunityExtension[], commex_ID: number) {
  return commexs.filter(commex => commex.commex_ID !== commex_ID);
}
