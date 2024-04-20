import { createSelector } from "@ngrx/store";
import { CommexState } from "../../services/Interfaces/commexState";


interface AppState {
  commexs: CommexState
}
export const selectFeature = (state: AppState) => state.commexs


export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
)

export const commexsSelector = createSelector(
  selectFeature,
  (state) => state.commexs
)


export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
)
