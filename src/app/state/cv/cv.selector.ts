import { createSelector, createFeatureSelector } from "@ngrx/store";
import { CertState, EducState, ProfileState } from "./cv.reducer";

export const selectProfileState = createFeatureSelector<ProfileState>('profile');
export const selectEducState = createFeatureSelector<EducState>('educ');
export const selectCertState = createFeatureSelector<CertState>('cert');


export const selectAllProfile = createSelector(
    selectProfileState,
    (state: ProfileState) => state.profile
);

export const selectAllEduc = createSelector(
    selectEducState,
    (state: EducState) => state.educs
);

export const selectAllCerts = createSelector(
    selectCertState,
    (state: CertState) => state.certs
);

