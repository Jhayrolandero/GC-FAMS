import { createAction, props } from "@ngrx/store";
import { Certifications } from "../../services/Interfaces/certifications";
import { EducationalAttainment } from "../../services/Interfaces/educational-attainment";
import { Profile } from "../../services/Interfaces/profile";


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


