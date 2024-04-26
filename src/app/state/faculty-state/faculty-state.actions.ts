import { createAction, props } from "@ngrx/store";
import { Certifications } from "../../services/Interfaces/certifications";
import { EducationalAttainment } from "../../services/Interfaces/educational-attainment";
import { Profile } from "../../services/Interfaces/profile";
import { IndustryExperience } from "../../services/Interfaces/industry-experience";
import { Project } from "../../services/Interfaces/project";
import { Expertise } from "../../services/Interfaces/expertise";
import { Evaluation } from "../../services/Interfaces/evaluation";


export const loadProfile = createAction('[Profile Global] Load Profile');
export const loadProfileSuccess = createAction(
    '[Profile Global] Profile Load Success',
    props<{ profile: Profile }>()
);
export const loadProfileFailure = createAction(
    '[Profile Global] Profile Load Success',
    props<{ error: string }>()
);


export const loadEduc = createAction('[Education Global] Load Education');
export const loadEducSuccess = createAction(
    '[Education Global] Education Load Success',
    props<{ educs: EducationalAttainment[] }>()
);
export const loadEducFailure = createAction(
    '[Education Global] Education Load Success',
    props<{ error: string }>()
);


export const loadCert = createAction('[Certificate Global] Load Certificate');
export const loadCertSuccess = createAction(
    '[Certificate Global] Certificate Load Success',
    props<{ certs: Certifications[] }>()
);
export const loadCertsFailure = createAction(
    '[Certificate Global] Certificate Load Success',
    props<{ error: string }>()
);


export const loadExp = createAction('[Experience Global] Load Experience');
export const loadExpSuccess = createAction(
    '[Experience Global] Experience Load Success',
    props<{ exps: IndustryExperience[] }>()
);
export const loadExpFailure = createAction(
    '[Experience Global] Experience Load Success',
    props<{ error: string }>()
);


export const loadProj = createAction('[Project Global] Load Project');
export const loadProjSuccess = createAction(
    '[Project Global] Project Load Success',
    props<{ proj: Project[] }>()
);
export const loadProjFailure = createAction(
    '[Project Global] Project Load Success',
    props<{ error: string }>()
);


export const loadExpertise = createAction('[Expertise Global] Load Expertise');
export const loadExpertiseSuccess = createAction(
    '[Expertise Global] Expertise Load Success',
    props<{ expertises: Expertise[] }>()
);
export const loadExpertiseFailure = createAction(
    '[Expertise Global] Expertise Load Success',
    props<{ error: string }>()
);

export const loadEval = createAction('[Evaluation Global] Load Evaluation');
export const loadEvalSuccess = createAction(
    '[Evaluation Global] Evaluation Load Success',
    props<{ evals: Evaluation[] }>()
);
export const loadEvalFailure = createAction(
    '[Evaluation Global] Evaluation Load Success',
    props<{ error: string }>()
);

export function loadEvaluation(loadEvaluation: any): import("rxjs").OperatorFunction<import("@ngrx/store").Action, any> {
    throw new Error("Function not implemented.");
}
