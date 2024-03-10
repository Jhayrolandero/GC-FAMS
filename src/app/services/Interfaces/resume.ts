import { Certifications } from "./certifications";
import { EducationalAttainment } from "./educational-attainment";
import { Expertise } from "./expertise";
import { IndustryExperience } from "./industry-experience";
import { Project } from "./project";


export interface Resume {
    educAttainment: EducationalAttainment[],
    certifications: Certifications[],
    industryExp: IndustryExperience[],
    expertise: Expertise[]
    projects: Project[]
}
