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
import { Courses } from "../../services/Interfaces/courses";
import { CoursesFaculty } from "../../services/Interfaces/courses-faculty";

export interface ProfileState {
  profile?: Profile;
  certs: [CertificationsFaculty[], Certifications[]];
  educs: EducationalAttainment[];
  exps: IndustryExperience[];
  proj: Project[];
  expertises: Expertise[];
  evals: Evaluation[];
  courses: [CoursesFaculty[], Courses[]];
  isLoading: boolean
}

export const initialProfileState: ProfileState = {
  profile: undefined,
  certs: [[], []],
  educs: [],
  exps: [],
  proj: [],
  expertises: [],
  evals: [],
  courses: [[], []],
  isLoading: false
}

export const profileReducer = createReducer(
  initialProfileState,

  on(CertActions.loadProfile, (state) => ({
    ...state,
    isLoading: true
  })),
  on(CertActions.loadProfileSuccess, (state, { profile }) => ({
    ...state,
    profile: profile,
    isLoading: false
  })),
  on(CertActions.loadProfileFailure, (state) => ({
    ...state,
    isLoading: false

  })),

  on(CertActions.loadEduc, (state) => ({ ...state })),
  on(CertActions.loadEducSuccess, (state, { educs }) => ({
    ...state,
    educs: educs
  })),
  on(CertActions.loadEducFailure, (state) => ({ ...state, })),

  on(CertActions.loadCert, (state) => ({ ...state })),
  on(CertActions.loadCertSuccess, (state, { certs }) => ({
    ...state,
    certs: certs
  })),
  on(CertActions.loadCertsFailure, (state) => ({ ...state, })),

  on(CertActions.loadExp, (state) => ({ ...state })),
  on(CertActions.loadExpSuccess, (state, { exps }) => ({
    ...state,
    exps: exps
  })),
  on(CertActions.loadExpFailure, (state) => ({ ...state, })),

  on(CertActions.loadProj, (state) => ({ ...state })),
  on(CertActions.loadProjSuccess, (state, { proj }) => ({
    ...state,
    proj: proj
  })),
  on(CertActions.loadProjFailure, (state) => ({ ...state, })),

  on(CertActions.loadExpertise, (state) => ({ ...state })),
  on(CertActions.loadExpertiseSuccess, (state, { expertises }) => ({
    ...state,
    expertises: expertises
  })),
  on(CertActions.loadExpertiseFailure, (state) => ({ ...state, })),

  on(CertActions.loadEval, (state) => ({ ...state })),
  on(CertActions.loadEvalSuccess, (state, { evals }) => ({
    ...state,
    evals: evals
  })),
  on(CertActions.loadEvalFailure, (state) => ({ ...state, })),


  on(CertActions.loadCourse, (state) => ({ ...state })),
  on(CertActions.loadCourseSuccess, (state, { courses }) => ({
    ...state,
    courses: courses
  })),
  on(CertActions.loadCourseFailure, (state) => ({ ...state, })),
)
