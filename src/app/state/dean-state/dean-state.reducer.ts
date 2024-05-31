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
import { ExpertiseFaculty } from "../../services/Interfaces/expertise-faculty";

export interface DeanState {
  colleges: College[];
  profile: Faculty[];
  certs: CertificationsFaculty[];
  educs: EducationalAttainment[];
  exps: IndustryExperience[];
  proj: Project[];
  expertises: [ExpertiseFaculty[], Expertise[]];
  evals: Evaluation[];
  courses: [CoursesFaculty[], Courses[]];
  commex: CommunityExtension[];
  evalsLoading: boolean,
  collegeLoading: boolean,
  profileLoading: boolean,
  certsLoading: boolean,
  educsLoading: boolean,
  expsLoading: boolean,
  projLoading: boolean,
  exptLoading: boolean,
  coursesLoading: boolean,
  commexLoading: boolean
}

export const initialDeanState: DeanState = {
  colleges: [],
  evalsLoading: false,
  collegeLoading: false,
  profileLoading: false,
  certsLoading: false,
  educsLoading: false,
  expsLoading: false,
  projLoading: false,
  exptLoading: false,
  coursesLoading: false,
  commexLoading: false,
  profile: [],
  certs: [],
  educs: [],
  exps: [],
  proj: [],
  expertises: [[], []],
  evals: [],
  courses: [[], []],
  commex: []
}

export const profileDeanReducer = createReducer(
  initialDeanState,


  on(CertActions.loadCollege, (state) => ({ ...state, collegeLoading: true })),
  on(CertActions.loadCollegeSuccess, (state, { colleges }) => ({
    ...state,
    colleges: colleges,
    collegeLoading: false
  })),
  on(CertActions.loadCollegeFailure, (state) => ({
    ...state,
    collegeLoading: false
  })),
  on(CertActions.loadCollegeProfile, (state) => ({
    ...state,
    profileLoading: true
  })),
  on(CertActions.loadCollegeProfileSuccess, (state, { profile }) => ({
    ...state,
    profile: profile,
    profileLoading: false
  })),
  on(CertActions.loadCollegeProfileFailure, (state) => ({
    ...state,
    profileLoading: false
  })),
  on(CertActions.loadCollegeEduc, (state) => ({
    ...state,
    educsLoading: true
   })),
  on(CertActions.loadCollegeEducSuccess, (state, { educs }) => ({
    ...state,
    educs: educs,
    educsLoading: false
  })),
  on(CertActions.loadCollegeEducFailure, (state) => ({
    ...state,
    educsLoading: false
  })),
  on(CertActions.loadCollegeCert, (state) => ({
    ...state,
    certsLoading: true
  })),
  on(CertActions.loadCollegeCertSuccess, (state, { certs }) => ({
    ...state,
    certs: certs,
    certsLoading: false
  })),
  on(CertActions.loadCollegeCertsFailure, (state) => ({
    ...state,
    certsLoading: false
  })),
  on(CertActions.loadCollegeExp, (state) => ({
    ...state,
    expsLoading: true
  })),
  on(CertActions.loadCollegeExpSuccess, (state, { exps }) => ({
    ...state,
    exps: exps,
    expsLoading: false
  })),
  on(CertActions.loadCollegeExpFailure, (state) => ({
    ...state,
    expsLoading: false
  })),
  on(CertActions.loadCollegeProj, (state) => ({
    ...state,
    profileLoading: true
  })),
  on(CertActions.loadCollegeProjSuccess, (state, { proj }) => ({
    ...state,
    proj: proj,
    profileLoading: false
  })),
  on(CertActions.loadCollegeProjFailure, (state) => ({
    ...state,
    profileLoading: false
  })),
  on(CertActions.loadCollegeExpertise, (state) => ({
    ...state,
    expsLoading: true
  })),
  on(CertActions.loadCollegeExpertiseSuccess, (state, { expertises }) => ({
    ...state,
    expertises: expertises,
    expsLoading: false
  })),
  on(CertActions.loadCollegeExpertiseFailure, (state) => ({
    ...state,
    expsLoading: false
   })),
  on(CertActions.loadCollegeEval, (state) => ({ ...state, evalsLoading: true })),
  on(CertActions.loadCollegeEvalSuccess, (state, { evals }) => ({
    ...state,
    evals: evals,
    evalsLoading: false
  })),
  on(CertActions.loadCollegeEvalFailure, (state) => ({
     ...state,
    evalsLoading: false
  })),
  on(CertActions.loadCollegeCourse, (state) => ({
    ...state,
    coursesLoading: true
  })),
  on(CertActions.loadCollegeCourseSuccess, (state, { courses }) => ({
    ...state,
    courses: courses,
    coursesLoading: false
  })),
  on(CertActions.loadCollegeCourseFailure, (state) => ({
    ...state,
    coursesLoading: false
  })),

  on(CertActions.loadCollegeCommex, (state) => ({
    ...state,
    commexLoading: true,
  })),
  on(CertActions.loadCollegeCommexSuccess, (state, { commex }) => ({
    ...state,
    commex: commex,
    commexLoading: false
  })),
  on(CertActions.loadCollegeCommexFailure, (state) => ({
    ...state,
    commexLoading: false
  }))
)
