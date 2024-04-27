import { createSelector, createFeatureSelector } from "@ngrx/store";
import { ProfileState } from "./faculty-state.reducer";

export const selectProfileState = createFeatureSelector<ProfileState>('profile');

export const selectAllProfile = createSelector(
    selectProfileState,
    (state: ProfileState) => state.profile
);

export const selectAllEduc = createSelector(
    selectProfileState,
    (state: ProfileState) => state.educs
);

export const selectAllExistCerts = createSelector(
    selectProfileState,
    (state: ProfileState) => state.certs[0]
);

export const selectAllCerts = createSelector(
    selectProfileState,
    (state: ProfileState) => state.certs[1]
);

export const selectAllExp = createSelector(
    selectProfileState,
    (state: ProfileState) => state.exps
);

export const selectAllProj = createSelector(
    selectProfileState,
    (state: ProfileState) => state.proj
);

export const selectAllExpertise = createSelector(
    selectProfileState,
    (state: ProfileState) => state.expertises
);

export const selectAllEvaluation = createSelector(
    selectProfileState,
    (state: ProfileState) => state.evals
);