import { createReducer, on } from "@ngrx/store";
import * as CertActions from "./faculty-state.actions";
import { EducationalAttainment } from "../../services/Interfaces/educational-attainment";
import { Profile } from "../../services/Interfaces/profile";
import { IndustryExperience } from "../../services/Interfaces/industry-experience";
import { Project } from "../../services/Interfaces/project";
import { Expertise } from "../../services/Interfaces/expertise";
import { Evaluation } from "../../services/Interfaces/evaluation";
import { CertificationsFaculty } from "../../services/Interfaces/certifications-faculty";
import { Certifications } from "../../services/Interfaces/certifications";

export interface ProfileState {
    profile?: Profile;
    certs: [CertificationsFaculty[], Certifications[]];
    educs: EducationalAttainment[];
    exps: IndustryExperience[];
    proj: Project[];
    expertises: Expertise[];
    evals: Evaluation[];
}

// export interface CertState {
//     certs: Certifications[];
// }

// export interface EducState{
//     educs: EducationalAttainment[];
// }

// export interface ExpState{
//     exps: IndustryExperience[];
// }

// export interface ProjState{
//     proj: Project[];
// }

// export interface ExpertiseState{
//     expertises: Expertise[];
// }

// export interface EvaluationState{
//     evals: Evaluation[];
// }

export const initialProfileState: ProfileState = {
    profile: undefined,
    certs: [[], []],
    educs: [],
    exps: [],
    proj: [],
    expertises: [],
    evals: []
}

// export const initialEducState: EducState = {
//     educs: []
// }

// export const initialCertState: CertState = {
//     certs: []
// };

// export const initialExpState: ExpState = {
//     exps: []
// }

// export const initialProjState: ProjState = {
//     proj: []
// }

// export const initialExpertiseState: ExpertiseState = {
//     expertises: []
// }

// export const initialEvaluationState: EvaluationState = {
//     evals: []
// }

export const profileReducer = createReducer(
    initialProfileState,

    on(CertActions.loadProfile, (state) => ({ ...state})),
    on(CertActions.loadProfileSuccess, (state, { profile }) => ({
        ...state,
        profile: profile
    })),
    on(CertActions.loadProfileFailure, (state) => ({...state,})),

    on(CertActions.loadEduc, (state) => ({ ...state})),
    on(CertActions.loadEducSuccess, (state, { educs }) => ({
        ...state,
        educs: educs
    })),
    on(CertActions.loadEducFailure, (state) => ({...state,})),

    on(CertActions.loadCert, (state) => ({ ...state})),
    on(CertActions.loadCertSuccess, (state, { certs }) => ({
        ...state,
        certs: certs
    })),
    on(CertActions.loadCertsFailure, (state) => ({...state,})),

    on(CertActions.loadExp, (state) => ({ ...state})),
    on(CertActions.loadExpSuccess, (state, { exps }) => ({
        ...state,
        exps: exps
    })),
    on(CertActions.loadExpFailure, (state) => ({...state,})),

    on(CertActions.loadProj, (state) => ({ ...state})),
    on(CertActions.loadProjSuccess, (state, { proj }) => ({
        ...state,
        proj: proj
    })),
    on(CertActions.loadProjFailure, (state) => ({...state,})),

    on(CertActions.loadExpertise, (state) => ({ ...state})),
    on(CertActions.loadExpertiseSuccess, (state, { expertises }) => ({
        ...state,
        expertises: expertises
    })),
    on(CertActions.loadExpertiseFailure, (state) => ({...state,})),

    on(CertActions.loadEval, (state) => ({ ...state})),
    on(CertActions.loadEvalSuccess, (state, { evals }) => ({
        ...state,
        evals: evals
    })),
    on(CertActions.loadEvalFailure, (state) => ({...state,}))
)