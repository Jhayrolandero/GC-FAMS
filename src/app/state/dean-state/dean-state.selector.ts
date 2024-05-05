import { createSelector, createFeatureSelector } from "@ngrx/store";
import { DeanState } from "./dean-state.reducer";
import { Evaluation } from "../../services/Interfaces/evaluation";

const date = new Date();
const currentYear: number  = date.getFullYear();

export const selectDeanState = createFeatureSelector<DeanState>('dean');

export const selectAllCollege = createSelector(
    selectDeanState,
    (state: DeanState) => state.colleges
  );


export const selectCollegeFaculty = createSelector(
  selectDeanState,
  (state: DeanState) => state.profile
);

export const selectCollegeFacultyCount = createSelector(
    selectDeanState,
    (state: DeanState) => state.profile.length
  );


export const selectAllCollegeEduc = createSelector(
    selectDeanState,
    (state: DeanState) => state.educs
);

export const selectAllExistCerts = createSelector(
    selectDeanState,
    (state: DeanState) => state.certs
);

//Averages out total certificate count each faculty
export const facultyCertsCountAverage = createSelector(
    selectDeanState,
    (state: DeanState) => {
        const certCountByFaculty: {[key: number] : number} = {};

        state.certs.forEach(cert => {
            if(certCountByFaculty[cert.faculty_ID]){
                certCountByFaculty[cert.faculty_ID] += 1;
            }
            else{
                certCountByFaculty[cert.faculty_ID] = 1;
            }
        })

        return Object.values(certCountByFaculty).reduce((acc, cur) => acc + cur, 0) / Object.keys(certCountByFaculty).length;
    }
);







export const selectCourseSched = createSelector(
    selectDeanState,
    (state: DeanState) => state.courses[0]
);

//Average of unit per faculty
export const facultyCourseUnitAverage = createSelector(
    selectDeanState,
    (state: DeanState) => {
        const unitByFaculty: {[key: number]: number} = {}

        state.courses[0].forEach(course => {
            if(unitByFaculty[course.faculty_ID]){
                unitByFaculty[course.faculty_ID] += (course.unit * course.class_count);
            }
            else{
                unitByFaculty[course.faculty_ID] = (course.unit * course.class_count);
            }
        });

        return Object.values(unitByFaculty).reduce((acc, curr) => acc + curr, 0) / state.profile.length
    }
);

export const selectCourses = createSelector(
    selectDeanState,
    (state: DeanState) => state.courses[1]
);








export const selectAllExp = createSelector(
    selectDeanState,
    (state: DeanState) => state.exps
);

export const selectAllProj = createSelector(
    selectDeanState,
    (state: DeanState) => state.proj
);

export const selectAllExpertise = createSelector(
    selectDeanState,
    (state: DeanState) => state.expertises
);



export const selectAllEvaluation = createSelector(
    selectDeanState,
    (state: DeanState) => state.evals
);

//Gets the averaged out evaluation of the entire college in a year.
//Fix formula later so it calculates relative to the entire college faculty instead of only existing evaluations.
export const yearEvaluationAverage = createSelector(
    selectDeanState,
    (state: DeanState) => {
        //Filters entire evaluation to current year only
        const yearEvaluation = state.evals.filter((evaluation: Evaluation) => evaluation.evaluation_year == currentYear);
        const params: number[] = Array.from({ length: 6 }, () => 0);

        //Iterates each filtered year, add each params of each iterable to the params array
        yearEvaluation.forEach((evaluation: Evaluation) => {
            params[0] += +evaluation.param1_score;
            params[1] += +evaluation.param2_score;
            params[2] += +evaluation.param3_score;
            params[3] += +evaluation.param4_score;
            params[4] += +evaluation.param5_score;
            params[5] += +evaluation.param6_score;
        });

        //Averages each param sum based on how long the filtered array is.
        params.forEach((sum, index) => {
            params[index] = sum / yearEvaluation.length;
        })

        //Average out the averaged 6 params. Return
        return params.reduce((acc , curr) => acc + curr, 0) / 6;
    }
);





export const selectCollegeCommex = createSelector(
    selectDeanState,
    (state: DeanState) => state.commex
);
          