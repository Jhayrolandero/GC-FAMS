import { createReducer, on } from "@ngrx/store";
import * as CertActions from "./dean-state.actions";
import { EducationalAttainment } from "../../services/Interfaces/educational-attainment";
import { Profile } from "../../services/Interfaces/profile";
import { IndustryExperience } from "../../services/Interfaces/industry-experience";
import { Project } from "../../services/Interfaces/project";
import { Expertise } from "../../services/Interfaces/expertise";
import { Evaluation } from "../../services/Interfaces/evaluation";
import { CertificationsFaculty } from "../../services/Interfaces/certifications-faculty";
import { Certifications } from "../../services/Interfaces/certifications";
import { Courses } from "../../services/Interfaces/courses";
import { CoursesFaculty } from "../../services/Interfaces/courses-faculty";
import { Faculty } from "../../services/Interfaces/faculty";
import { CommunityExtension } from "../../services/Interfaces/community-extension";
import { College } from "../../services/Interfaces/college";

export interface DeanState {
    colleges: College[];
    profile: Faculty[];
    certs: CertificationsFaculty[];
    educs: EducationalAttainment[];
    exps: IndustryExperience[];
    proj: Project[];
    expertises: Expertise[];
    evals: Evaluation[];
    courses: [CoursesFaculty[], Courses[]] | null;
    commex: CommunityExtension[];
}

export const initialDeanState: DeanState = {
    colleges: [],
    profile: [],
    certs: [],
    educs: [],
    exps: [],
    proj: [],
    expertises: [],
    evals: [],
    courses: [[], []],
    commex: []
}

export const profileDeanReducer = createReducer(
    initialDeanState,

    
    on(CertActions.loadCollege, (state) => ({ ...state})),
    on(CertActions.loadCollegeSuccess, (state, { colleges }) => ({
        ...state,
        colleges: colleges
    })),
    on(CertActions.loadCollegeFailure, (state) => ({...state,})),




    on(CertActions.loadCollegeProfile, (state) => ({ ...state})),
    on(CertActions.loadCollegeProfileSuccess, (state, { profile }) => ({
        ...state,
        profile: profile
    })),
    on(CertActions.loadCollegeProfileFailure, (state) => ({...state,})),

    on(CertActions.loadCollegeEduc, (state) => ({ ...state})),
    on(CertActions.loadCollegeEducSuccess, (state, { educs }) => ({
        ...state,
        educs: educs
    })),
    on(CertActions.loadCollegeEducFailure, (state) => ({...state,})),

    on(CertActions.loadCollegeCert, (state) => ({ ...state})),
    on(CertActions.loadCollegeCertSuccess, (state, { certs }) => ({
        ...state,
        certs: certs
    })),
    on(CertActions.loadCollegeCertsFailure, (state) => ({...state,})),

    on(CertActions.loadCollegeExp, (state) => ({ ...state})),
    on(CertActions.loadCollegeExpSuccess, (state, { exps }) => ({
        ...state,
        exps: exps
    })),
    on(CertActions.loadCollegeExpFailure, (state) => ({...state,})),

    on(CertActions.loadCollegeProj, (state) => ({ ...state})),
    on(CertActions.loadCollegeProjSuccess, (state, { proj }) => ({
        ...state,
        proj: proj
    })),
    on(CertActions.loadCollegeProjFailure, (state) => ({...state,})),

    on(CertActions.loadCollegeExpertise, (state) => ({ ...state})),
    on(CertActions.loadCollegeExpertiseSuccess, (state, { expertises }) => ({
        ...state,
        expertises: expertises
    })),
    on(CertActions.loadCollegeExpertiseFailure, (state) => ({...state,})),

    on(CertActions.loadCollegeEval, (state) => ({ ...state})),
    on(CertActions.loadCollegeEvalSuccess, (state, { evals }) => ({
        ...state,
        evals: evals
    })),
    on(CertActions.loadCollegeEvalFailure, (state) => ({...state,})),


    on(CertActions.loadCollegeCourse, (state) => ({ ...state})),
    on(CertActions.loadCollegeCourseSuccess, (state, { courses }) => ({
        ...state,
        courses: courses
    })),
    on(CertActions.loadCollegeCourseFailure, (state) => ({...state,})),

    on(CertActions.loadCollegeCommex, (state) => ({ ...state})),
    on(CertActions.loadCollegeCommexSuccess, (state, { commex }) => ({
        ...state,
        commex: commex
    })),
    on(CertActions.loadCollegeCommexFailure, (state) => ({ ...state, })),
    on(CertActions.flushCollege, (state) => ({
        ...state,
        colleges: [],
        profile: [],
        certs: [],
        educs: [],
        exps: [],
        proj: [],
        expertises: [],
        evals: [],
        courses: null,
        commex: []
    }))
)
