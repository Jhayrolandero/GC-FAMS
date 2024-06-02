export interface Project {
    project_ID: number,
    project_name: string,
    project_date: Date,
    project_detail: string,
    project_type: string,
    project_link?: string,
    isFinished: boolean
}

export interface ProjectAuthor {
    faculty_ID: number,
    project_ID: number,
    author_type: string,
    isSelected: boolean
}

export interface ProjectImage {
    faculty_ID: number,
    project_image: string,
}