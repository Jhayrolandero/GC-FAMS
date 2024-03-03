export interface Profile {
    faculty_ID: number,
    college_ID: number,
    teaching_position: string,
    isAdmin: boolean,
    first_name: string,
    last_name: string,
    birthdate: Date,
    age: number,
    citizenship: string,
    civil_status: string,
    sex: string,
    email: string,
    employment_status: boolean,
    address: string
    profile_image: Blob,
    cover_image: Blob
}
