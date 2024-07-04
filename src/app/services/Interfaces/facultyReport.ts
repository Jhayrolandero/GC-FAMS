import { StoreConfig } from "@ngrx/store";

export interface FacultyReport {
  "Name": string;
  "Email": string;
  "Phone Number": string;
  "Employment Status (FT/PT)": string;
  "Related Certificates": string;
  "Related Professional Experience": string;
  "Teaching Year/s Experience": string;
  "Units Load": string;
  "Courses Taught": string;
  [title: string]: (number | string);
  "Expertise": string;
  "Baccalaureate": string;
  "Masterals": string;
  "Doctorate": string;
  "Associate": string;
}
