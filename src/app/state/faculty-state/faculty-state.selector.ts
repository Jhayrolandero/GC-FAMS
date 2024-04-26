import { createSelector, createFeatureSelector } from "@ngrx/store";
import { CertState, EducState, EvaluationState, ExpState, ExpertiseState, ProfileState, ProjState } from "./faculty-state.reducer";

export const selectProfileState = createFeatureSelector<ProfileState>('profile');
export const selectEducState = createFeatureSelector<EducState>('educ');
export const selectCertState = createFeatureSelector<CertState>('cert');
export const selectExpState = createFeatureSelector<ExpState>('exp');
export const selectProjState = createFeatureSelector<ProjState>('proj');
export const selectExpertiseState = createFeatureSelector<ExpertiseState>('expertise');
export const selectEvaluationState = createFeatureSelector<EvaluationState>('eval');


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

export const selectAllExp = createSelector(
    selectExpState,
    (state: ExpState) => state.exps
);

export const selectAllProj = createSelector(
    selectProjState,
    (state: ProjState) => state.proj
);

export const selectAllExpertise = createSelector(
    selectExpertiseState,
    (state: ExpertiseState) => state.expertises
);

export const selectAllEvaluation = createSelector(
    selectEvaluationState,
    (state: EvaluationState) => state.evals
);