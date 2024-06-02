import { StoreConfig } from "@ngrx/store";

export interface FacultyReport {
  "Name": string;
  "Email": string;
  "Phonenumber": string;
  "Employment Status (FT/PT)": string;
  "Related Certificates": string;
  "Related Professional Experience": string;
  "Teaching year/s experience": string;
  "Units Load": string;
  "Courses Taught": string;
  [title: string]: (number | string);
  "Expertise": string;
  "Baccaleurate": string;
  "Masterals": string;
  "Doctorate": string;
  "Associate": string;
}
