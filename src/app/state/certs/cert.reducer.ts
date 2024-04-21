import { Action, createReducer, on } from "@ngrx/store";
import { Certifications } from "../../services/Interfaces/certifications";
import * as CertActions from "./cert.actions";

export interface CertState {
    certs: Certifications[];
    error: string;
    status: string;
}

export const initialState: CertState = {
    certs: [],
    error: '',
    status: 'pending',
};

export const certReducer = createReducer(
    initialState,

    on(CertActions.loadCert, (state) => ({ ...state, status: 'fetching'})),
    on(CertActions.loadCertSuccess, (state, { certs }) => ({
        ...state,
        certs: certs,
        error: "",
        status: 'success',
    })),
    on(CertActions.loadCertsFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: 'error',
    })),
)