import { CommunityExtension } from "./community-extension";

export interface CommexState {
  isLoading: boolean;
  commexs: CommunityExtension[];
  error: string | null
}
