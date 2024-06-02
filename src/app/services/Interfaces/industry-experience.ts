export interface IndustryExperience {
    experience_ID: number,
    faculty_ID: number,
    experience_place: string,
    experience_title: string,
    experience_details: string,
    experience_from: Date,
    experience_to?: Date,
    isSelected: boolean,
    teaching_related: number
}
