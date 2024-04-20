import { createAction, props } from "@ngrx/store";
import { CommunityExtension } from "../../services/Interfaces/community-extension";

export const getCommex = createAction('[Commex] Fetch Commex')

export const getCommexSuccess = createAction('[Commex] Fetch Commex Success',
  props<{ commexs: CommunityExtension[] }>()
)

export const getCommexFailure = createAction('[Commex] Fetch Commex Failure',
  props<{ error: string }>()
)
