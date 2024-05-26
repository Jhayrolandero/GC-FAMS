export interface Project {
    project_ID: number,
    faculty_ID: number,
    project_name: string,
    project_date: Date,
    project_detail: string,
    project_link?: string,
    isSelected: boolean
}
