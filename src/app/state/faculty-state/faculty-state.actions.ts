import { createAction, props } from "@ngrx/store";
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
import { UpdateFaculty } from "../../services/Interfaces/updateFaculty";
import { SupportingDocs } from "../../services/Interfaces/supportingDocs";
import { IndustrySupportingDocs } from "../../services/Interfaces/industrySupportDocs";
import { ExpSupportingDocs } from "../../services/Interfaces/expSupportDocs";
import { CertSupportingDocs } from "../../services/Interfaces/certSupportDocs";
import { Research, ResearchAuthor } from "../../services/Interfaces/research";


export const loadProfile = createAction('[Profile Global] Load Profile');
export const loadProfileSuccess = createAction(
  '[Profile Global] Profile Load Success',
  props<{ profile: Profile | undefined }>()
);
export const loadProfileFailure = createAction(
  '[Profile Global] Profile Load Failed',
  props<{ error: string }>()
);


export const loadEduc = createAction('[Education Global] Load Education');
export const loadEducSuccess = createAction(
  '[Education Global] Education Load Success',
  props<{ educs: EducationalAttainment[] }>()
);
export const loadEducFailure = createAction(
  '[Education Global] Education Load Failed',
  props<{ error: string }>()
);


export const loadCert = createAction('[Certificate Global] Load Certificate');
export const loadCertSuccess = createAction(
  '[Certificate Global] Certificate Load Success',
  props<{ certs: [CertificationsFaculty[], Certifications[]] }>()
);
export const loadCertsFailure = createAction(
  '[Certificate Global] Certificate Load Failed',
  props<{ error: string }>()
);


export const loadExp = createAction('[Experience Global] Load Experience');
export const loadExpSuccess = createAction(
  '[Experience Global] Experience Load Success',
  props<{ exps: IndustryExperience[] }>()
);
export const loadExpFailure = createAction(
  '[Experience Global] Experience Load Failed',
  props<{ error: string }>()
);


export const loadProj = createAction('[Project Global] Load Project');
export const loadProjSuccess = createAction(
  '[Project Global] Project Load Success',
  props<{ proj: Project[] }>()
);
export const loadProjFailure = createAction(
  '[Project Global] Project Load Failed',
  props<{ error: string }>()
);

export const loadResearch = createAction('[Course Global] Load Research');
export const loadResearchSuccess = createAction(
  '[Course Global] Research Load Success',
  props<{ research: [Research[], ResearchAuthor[]] }>()
);
export const loadResearchFailure = createAction(
  '[Course Global] Research Load Failed',
  props<{ error: string }>()
);


export const loadExpertise = createAction('[Expertise Global] Load Expertise');
export const loadExpertiseSuccess = createAction(
  '[Expertise Global] Expertise Load Success',
  props<{ expertises: [ExpertiseFaculty[], Expertise[]] }>()
);
export const loadExpertiseFailure = createAction(
  '[Expertise Global] Expertise Load Failed',
  props<{ error: string }>()
);

export const loadEval = createAction('[Evaluation Global] Load Evaluation');
export const loadEvalSuccess = createAction(
  '[Evaluation Global] Evaluation Load Success',
  props<{ evals: Evaluation[] }>()
);
export const loadEvalFailure = createAction(
  '[Evaluation Global] Evaluation Load Failed',
  props<{ error: string }>()
);

export const loadCourse = createAction('[Course Global] Load Course');
export const loadCourseSuccess = createAction(
  '[Course Global] Course Load Success',
  props<{ courses: [CoursesFaculty[], Courses[]] }>()
);
export const loadCourseFailure = createAction(
  '[Course Global] Course Load Failed',
  props<{ error: string }>()
);

export const loadCommex = createAction('[Commex College Global] Load Commex');
export const loadCommexSuccess = createAction(
    '[Commex College Global] Commex Load Success',
    props<{ commex: CommunityExtension[]}>()
);
export const loadCommexFailure = createAction(
    '[Commex College Global] Commex Load Failed',
    props<{ error: string }>()
);
export const updateProfile = createAction(
  '[Profile Global] Update Profile',
  props<{filename: string, faculty_ID: number}>()
)
export const updateCover = createAction(
  '[Profile Global] Update Cover',
  props<{filename: string, faculty_ID: number}>()
)
export const updateInfo = createAction(
  '[Profile Global] Update Profile Info',
  props<{facultyData : UpdateFaculty}>()
)
export const updateInfoSuccess = createAction(
  '[Profile Global] Update Profile Info Success',
  props<{facultyData : UpdateFaculty}>()
)

export const updateInfoFailure = createAction(
  '[Profile Global] Update Profile Info Fail',
  props<{error : Error}>()
)

export const updatePassword = createAction(
  '[Profile Global] Update Password',
  props<{password : string, id? : number}>()
)

export const updatePasswordSuccess = createAction(
  '[Profile Global] Update Password Success',
  props<{password : string}>()
)

export const updatePasswordFailure = createAction(
  '[Profile Global] Update Password Fail',
  props<{error : Error}>()
)

export const loadSupportingDocs = createAction(
  '[Profile Global] Load Supporting Docs'
)

export const loadEducSupportingDocsSuccess = createAction(
  '[Profile Global] Load Educ Supporting Docs Success',
  props<{ educDocs: SupportingDocs[]}>()
)
export const loadCertSupportingDocsSuccess = createAction(
  '[Profile Global] Load Cert Supporting Docs Success',
  props<{ certDocs: CertSupportingDocs[]}>()
)
export const loadExpSupportingDocsSuccess = createAction(
  '[Profile Global] Load Exp Supporting Docs Success',
  props<{ expDocs: ExpSupportingDocs[]}>()
)
export const loadIndustrySupportingDocsSuccess = createAction(
  '[Profile Global] Load Industry Supporting Docs Success',
  props<{ industryDocs: IndustrySupportingDocs[]}>()
)
export const loadEducSupportingDocsFailure = createAction(
  '[Profile Global] Load Educ Supporting Docs Failure',
  props<{ error: string}>()
)
export const loadCertSupportingDocsFailure = createAction(
  '[Profile Global] Load Cert Supporting Docs Failure',
  props<{ error: string}>()
)
export const loadExpSupportingDocsFailure = createAction(
  '[Profile Global] Load Exp Supporting Docs Failure',
  props<{ error: string}>()
)
export const loadIndustrySupportingDocsFailure = createAction(
  '[Profile Global] Load Industry Supporting Docs Failure',
  props<{ error: string}>()
)
export const postSupportDocs = createAction(
  '[Profile Global] Post Supporting Docs',
  props<{ docType: string, data: FormData }>()
)

export const deleteSupportDocs = createAction(
  '[Profile Global] Delete Supporting Docs',
  props<{ docType: string }>()
)
export const deleteSupportDocsSuccess = createAction(
  '[Profile Global] Delete Supporting Docs Success')

export const deleteSupportDocsFailure = createAction(
  '[Profile Global] Delete Supporting Docs Failure',
  props<{ error: string }>()
)

export const postSupportDocsSuccess = createAction(
  '[Profile Global] Post Supporting Docs Success',
)

export const postSupportDocsFailure = createAction(
  '[Profile Global] Post Supporting Docs Fail',
  props<{ error : string}>()
)

// export const postSupportDocs = createAction (
//   '[Profile Global] Post Supporting Docs',
//     props<{ type: string}>()
// )

export const flushProfileState = createAction('[Profile Global] Flush Profile');
