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
import { ExpertiseFaculty } from "../../services/Interfaces/expertise-faculty";
import { CommunityExtension } from "../../services/Interfaces/community-extension";
import { state } from "@angular/animations";
import { UpdateFaculty } from "../../services/Interfaces/updateFaculty";

export interface ProfileState {
  profile: Profile | undefined;
  certs: [CertificationsFaculty[], Certifications[]];
  educs: EducationalAttainment[];
  exps: IndustryExperience[];
  proj: Project[];
  expertises: [ExpertiseFaculty[], Expertise[]];
  evals: Evaluation[];
  courses: [CoursesFaculty[], Courses[]];
  commex: CommunityExtension[];
  isLoading: boolean;
  passwordLoading: boolean;
  editLoading:boolean;
  profileError: Error | undefined;
  passwordError: Error |undefined
}

export const initialProfileState: ProfileState = {
  profile: undefined,
  certs: [[], []],
  educs: [],
  exps: [],
  proj: [],
  expertises: [[], []],
  evals: [],
  courses: [[], []],
  commex: [],
  isLoading: false,
  passwordLoading: false,
  editLoading: false,
  profileError: undefined,
  passwordError: undefined
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
  on(CertActions.updateProfile, (state, action) => ({
    ...state,
    profile: {
      ...state.profile!,
      profile_image: `/GC-FaMS-API/API/Controller/../../Image_Assets/Faculty_Profile/${action.faculty_ID}/${action.filename}`  // Update the profile_image property
    }
  })),
  on(CertActions.updateCover, (state, action) => ({
    ...state,
    profile: {
      ...state.profile!,
      cover_image: `/GC-FaMS-API/API/Controller/../../Image_Assets/Faculty_Cover/${action.faculty_ID}/${action.filename}`  // Update the profile_image property
    }
  })),
  on(CertActions.updatePasswordFailure, (state, action) => ({
    ...state,
    passwordError: action.error
  })),
  on(CertActions.updateInfo, (state) => ({
    ...state,
    editLoading: true
  })),
  on(CertActions.updateInfoSuccess, (state, action) => ({
    ...state,
    editLoading: false,
    profile: updateProfile(state.profile!, action.facultyData)
  })),
  on(CertActions.updateInfoFailure, (state, action) => ({
    ...state,
    editLoading: false,
    profileError: action.error
  })),
  on(CertActions.updatePassword, (state) => ({
    ...state,
    passwordLoading: true,
  })),
  on(CertActions.updatePasswordSuccess, (state) => ({
    ...state,
    passwordLoading: false
  })),
  on(CertActions.updatePasswordFailure, (state, action) => ({
    ...state,
    passwordLoading: false,
    passwordError: action.error
  })),

)

function updateProfile(profile: Profile, newProfile: UpdateFaculty) {

  const profileCopy = { ...profile}
  return {
      ...profileCopy,
      age: newProfile.age,
      barangay: newProfile.barangay,
      birthdate: newProfile.birthdate,
      citizenship: newProfile.citizenship,
      city: newProfile.city,
      civil_status: newProfile.civil_status,
      ext_name: newProfile.ext_name,
      first_name: newProfile.first_name,
      language: newProfile.language,
      last_name: newProfile.last_name,
      middle_name: newProfile.middle_name,
      phone_number: newProfile.phone_number,
      province: newProfile.province,
      region: newProfile.region,
      sex: newProfile.sex,
    };
}
