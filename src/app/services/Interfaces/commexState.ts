import { CommunityExtension } from "./community-extension";

export interface CommexState {
  postLoading: boolean;
  isLoading: boolean;
  commexs: CommunityExtension[];
  error: string | null | any
}
