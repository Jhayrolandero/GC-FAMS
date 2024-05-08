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
import { Faculty } from "../../services/Interfaces/faculty";
import { CommunityExtension } from "../../services/Interfaces/community-extension";
import { College } from "../../services/Interfaces/college";
import { ExpertiseFaculty } from "../../services/Interfaces/expertise-faculty";

export const loadCollege = createAction('[College Global] Load College');
export const loadCollegeSuccess = createAction(
    '[College Global] College Load Success',
    props<{ colleges: College[] }>()
);
export const loadCollegeFailure = createAction(
    '[College Global] College Load Failed',
    props<{ error: string }>()
);



export const loadCollegeProfile = createAction('[Profile College Global] Load Profile');
export const loadCollegeProfileSuccess = createAction(
    '[Profile College Global] Profile Load Success',
    props<{ profile: Faculty[] }>()
);
export const loadCollegeProfileFailure = createAction(
    '[Profile College Global] Profile Load Failed',
    props<{ error: string }>()
);


export const loadCollegeEduc = createAction('[Education College Global] Load Education');
export const loadCollegeEducSuccess = createAction(
    '[Education College Global] Education Load Success',
    props<{ educs: EducationalAttainment[] }>()
);
export const loadCollegeEducFailure = createAction(
    '[Education College Global] Education Load Failed',
    props<{ error: string }>()
);


export const loadCollegeCert = createAction('[Certificate College Global] Load Certificate');
export const loadCollegeCertSuccess = createAction(
    '[Certificate College Global] Certificate Load Success',
    props<{ certs: CertificationsFaculty[] }>()
);
export const loadCollegeCertsFailure = createAction(
    '[Certificate College Global] Certificate Load Failed',
    props<{ error: string }>()
);


export const loadCollegeExp = createAction('[Experience College Global] Load Experience');
export const loadCollegeExpSuccess = createAction(
    '[Experience College Global] Experience Load Success',
    props<{ exps: IndustryExperience[] }>()
);
export const loadCollegeExpFailure = createAction(
    '[Experience College Global] Experience Load Failed',
    props<{ error: string }>()
);


export const loadCollegeProj = createAction('[Project College Global] Load Project');
export const loadCollegeProjSuccess = createAction(
    '[Project College Global] Project Load Success',
    props<{ proj: Project[] }>()
);
export const loadCollegeProjFailure = createAction(
    '[Project College Global] Project Load Failed',
    props<{ error: string }>()
);


export const loadCollegeExpertise = createAction('[Expertise College Global] Load Expertise');
export const loadCollegeExpertiseSuccess = createAction(
    '[Expertise College Global] Expertise Load Success',
    props<{ expertises: [ExpertiseFaculty[], Expertise[]] }>()
);
export const loadCollegeExpertiseFailure = createAction(
    '[Expertise College Global] Expertise Load Failed',
    props<{ error: string }>()
);

export const loadCollegeEval = createAction('[Evaluation College Global] Load Evaluation');
export const loadCollegeEvalSuccess = createAction(
    '[Evaluation College Global] Evaluation Load Success',
    props<{ evals: Evaluation[] }>()
);
export const loadCollegeEvalFailure = createAction(
    '[Evaluation College Global] Evaluation Load Failed',
    props<{ error: string }>()
);

export const loadCollegeCourse = createAction('[Course College Global] Load Course');
export const loadCollegeCourseSuccess = createAction(
    '[Course College Global] Course Load Success',
    props<{ courses: [CoursesFaculty[], Courses[]] }>()
);
export const loadCollegeCourseFailure = createAction(
    '[Course College Global] Course Load Failed',
    props<{ error: string }>()
);


export const loadCollegeCommex = createAction('[Commex College Global] Load Commex');
export const loadCollegeCommexSuccess = createAction(
    '[Commex College Global] Commex Load Success',
    props<{ commex: CommunityExtension[]}>()
);
export const loadCollegeCommexFailure = createAction(
    '[Commex College Global] Commex Load Failed',
    props<{ error: string }>()
);


