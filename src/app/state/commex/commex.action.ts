import { createAction, props } from "@ngrx/store";
import { CommunityExtension } from "../../services/Interfaces/community-extension";

export const getCommex = createAction('[Commex] Fetch Commex',
  props<{ uri: string }>()
)

export const getCommexSuccess = createAction('[Commex] Fetch Commex Success',
  props<{ commexs: CommunityExtension[] }>()
)

export const getCommexFailure = createAction('[Commex] Fetch Commex Failure',
  props<{ error: string }>()
)
export const setLoading = createAction('[Commex] Set Load',
  props<{ status: boolean }>()
)

export const getCollegeCommex = createAction('[College Commex] Fetch Commex',
  props<{ uri: string }>()
)
export const getCollegeCommexSuccess = createAction('[College Commex] Fetch Commex Success',
  props<{ commexs: CommunityExtension[] }>()
)

export const getCollegeCommexFailure = createAction('[College Commex] Fetch Commex Failure',
  props<{ error: string }>()
)

export const setCollegeLoading = createAction('[College Commex] Set Load',
  props<{ status: boolean }>()
)

export const postCommex = createAction('[Commex] Post Commex',
  props<{ commex: FormData }>()
)

export const postCommexSuccess = createAction('[Commex] Post Commex Success',
  props<{ commex: CommunityExtension }>()
)

export const postCommexFailure = createAction('[Commex] Post Commex Failure',
  props<{ error: string }>()
)

export const deleteCommex = createAction('[Commex] Delete Commex',
  props<{ commex_ID: number }>()
)

export const deleteCommexSuccess = createAction('[Commex] Delete Commex Success',
  props<{ commex_ID: number }>()
)

export const deleteCommexFailure = createAction('[Commex] Delete Commex Failure',
  props<{ error: string }>()
)

