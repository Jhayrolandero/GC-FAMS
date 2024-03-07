import { Certifications } from "./certifications";
import { EducationalAttainment } from "./educational-attainment";
import { Expertise } from "./expertise";
import { IndustryExperience } from "./industry-experience";


export interface Resume {
    educAttainment: EducationalAttainment[],
    certifications: Certifications[],
    industryExp: IndustryExperience[],
    expertise: Expertise[]
}
