export interface Project {
    project_ID: number,
    project_name: string,
    project_start_date: Date,
    project_end_date: Date,
    project_detail: string,
    project_type: string,
    project_main_image: string
    project_link?: string,
    is_finished: boolean
}

export interface ProjectAuthor {
    faculty_ID: number,
    project_ID: number,
    author_type: string,
    is_selected: boolean
}

export interface ProjectImage {
    faculty_ID: number,
    project_image: string,
}