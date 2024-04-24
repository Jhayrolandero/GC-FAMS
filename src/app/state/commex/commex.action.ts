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

export const postCommex = createAction('[Commex] Post Commex',
  props<{ commex: FormData }>()
)

export const postCommexSuccess = createAction('[Commex] Post Commex Success',
  props<{ commex: CommunityExtension }>()
)

export const postCommexFailure = createAction('[Commex] Post Commex Failure',
  props<{ error: string }>()
)

