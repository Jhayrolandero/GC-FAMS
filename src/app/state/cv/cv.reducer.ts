import { Action, createReducer, on } from "@ngrx/store";
import { Certifications } from "../../services/Interfaces/certifications";
import * as CertActions from "./cv.actions";
import { EducationalAttainment } from "../../services/Interfaces/educational-attainment";
import { Profile } from "../../services/Interfaces/profile";

export interface ProfileState {
    profile?: Profile;
}

export interface CertState {
    certs: Certifications[];
}

export interface EducState{
    educs: EducationalAttainment[];
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