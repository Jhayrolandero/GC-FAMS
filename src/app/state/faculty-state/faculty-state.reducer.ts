import { Action, createReducer, on } from "@ngrx/store";
import { Certifications } from "../../services/Interfaces/certifications";
import * as CertActions from "./faculty-state.actions";
import { EducationalAttainment } from "../../services/Interfaces/educational-attainment";
import { Profile } from "../../services/Interfaces/profile";
import { IndustryExperience } from "../../services/Interfaces/industry-experience";
import { Project } from "../../services/Interfaces/project";
import { Expertise } from "../../services/Interfaces/expertise";

export interface ProfileState {
    profile?: Profile;
}

export interface CertState {
    certs: Certifications[];
}

export interface EducState{
    educs: EducationalAttainment[];
}

export interface ExpState{
    exps: IndustryExperience[];
}

export interface ProjState{
    proj: Project[];
}

export interface ExpertiseState{
    expertises: Expertise[];
}



export const initialProfileState: ProfileState = {
    profile: undefined
}

export const initialEducState: EducState = {
    educs: []
}

export const initialCertState: CertState = {
    certs: []
};

export const initialExpState: ExpState = {
    exps: []
}

export const initialProjState: ProjState = {
    proj: []
}

export const initialExpertiseState: ExpertiseState = {
    expertises: []
}


export const profileReducer = createReducer(
    initialProfileState,

    on(CertActions.loadProfile, (state) => ({ ...state})),
    on(CertActions.loadProfileSuccess, (state, { profile }) => ({
        ...state,
        profile: profile
    })),
    on(CertActions.loadProfileFailure, (state) => ({
        ...state,
    }))
)

export const educReducer = createReducer(
    initialEducState,

    on(CertActions.loadEduc, (state) => ({ ...state})),
    on(CertActions.loadEducSuccess, (state, { educs }) => ({
        ...state,
        educs: educs
    })),
    on(CertActions.loadEducFailure, (state) => ({
        ...state,
    }))
)

export const certReducer = createReducer(
    initialCertState,

    on(CertActions.loadCert, (state) => ({ ...state})),
    on(CertActions.loadCertSuccess, (state, { certs }) => ({
        ...state,
        certs: certs
    })),
    on(CertActions.loadCertsFailure, (state) => ({
        ...state,
    }))
)

export const expReducer = createReducer(
    initialExpState,

    on(CertActions.loadExp, (state) => ({ ...state})),
    on(CertActions.loadExpSuccess, (state, { exps }) => ({
        ...state,
        exps: exps
    })),
    on(CertActions.loadExpFailure, (state) => ({
        ...state,
    }))
)

export const projReducer = createReducer(
    initialProjState,

    on(CertActions.loadProj, (state) => ({ ...state})),
    on(CertActions.loadProjSuccess, (state, { proj }) => ({
        ...state,
        proj: proj
    })),
    on(CertActions.loadProjFailure, (state) => ({
        ...state,
    }))
)

export const expertiseReducer = createReducer(
    initialExpertiseState,

    on(CertActions.loadExpertise, (state) => ({ ...state})),
    on(CertActions.loadExpertiseSuccess, (state, { expertises }) => ({
        ...state,
        expertises: expertises
    })),
    on(CertActions.loadExpertiseFailure, (state) => ({
        ...state,
    }))
)