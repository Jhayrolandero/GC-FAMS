import { createSelector, createFeatureSelector } from "@ngrx/store";
import { CertState, EducState } from "./cv.reducer";

export const selectEducState = createFeatureSelector<EducState>('educ');
export const selectCertState = createFeatureSelector<CertState>('cert');


export const selectAllEduc = createSelector(
    selectEducState,
    (state: EducState) => state.educs
);

export const selectAllCerts = createSelector(
    selectCertState,
    (state: CertState) => state.certs
);

