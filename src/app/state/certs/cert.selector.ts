import { createSelector, createFeatureSelector } from "@ngrx/store";
import { CertState } from "./cert.reducer";

export const selectCertState = createFeatureSelector<CertState>('cert');

export const selectAllCerts = createSelector(
    selectCertState,
    (state: CertState) => state.certs
);