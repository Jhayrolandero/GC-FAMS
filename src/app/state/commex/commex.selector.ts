import { createSelector } from "@ngrx/store";
import { CommexState } from "../../services/Interfaces/commexState";
import { CommunityExtension } from "../../services/Interfaces/community-extension";
import { mainPort } from "../../app.component";


interface AppState {
  commexs: CommexState
}

interface CollegeCommexState {
  collegeCommexs: CommexState
}
export const selectFeature = (state: AppState) => state.commexs

export const selectCollegeCommexFeature = (state: CollegeCommexState) => state.collegeCommexs

export const isLoadingSelector = createSelector(selectFeature,
  (state) => state.isLoading
)
export const postLoadingSelector = createSelector(selectFeature,
  (state) => state.postLoading
)

export const commexSelector = createSelector(selectFeature,
  (state) => state.commexs
)

export const errorSelector = createSelector(selectFeature,
  (state) => state.error
)

export const parsedCommexSelector = createSelector(selectFeature,
  (state) => parsedCommex(state.commexs, mainPort)
)

export const latestCommexSelector = createSelector(selectFeature,
  (state) => latestCommex(state.commexs, mainPort)
)
export const isLoadingCollegeCommexSelector = createSelector(selectCollegeCommexFeature,
  (state) => state.isLoading
)

export const parsedCollegeCommexSelector = createSelector(selectCollegeCommexFeature,
  (state) => parsedCommex(state.commexs, mainPort)
)

export const latestCollegeCommexSelector = createSelector(selectCollegeCommexFeature,
  (state) => latestCommex(state.commexs, mainPort)
)

function parsedCommex(commexs: CommunityExtension[], mainPort: string) {
  const commexsCopy = dateSorter(commexs)

  const modifiedCommex = commexsCopy.map(commex => ({
    ...commex,
    commex_header_img: mainPort + commex.commex_header_img
  }))

  return modifiedCommex
}

function dateSorter(commexs: CommunityExtension[]) {
  const commexsCopy = [...commexs];

  commexsCopy.sort(function (a, b) {
    return new Date(b.commex_date).valueOf() - new Date(a.commex_date).valueOf();
  })

  return commexsCopy
}

function latestCommex(commexs: CommunityExtension[], mainPort: string) {
  const commexsCopy = dateSorter(commexs)
  const latestCommex = {
    ...commexsCopy[0],
    commex_header_img: mainPort + commexsCopy[0].commex_header_img
  }

  return latestCommex
}
