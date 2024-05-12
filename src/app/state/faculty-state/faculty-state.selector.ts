import { createSelector, createFeatureSelector } from "@ngrx/store";
import { ProfileState } from "./faculty-state.reducer";
import { Evaluation } from "../../services/Interfaces/evaluation";

const date = new Date();
const currentYear: number  = date.getFullYear();

export const selectProfileState = createFeatureSelector<ProfileState>('profile');

export const selectMilestoneCount = createSelector(
  selectProfileState,
  (state: ProfileState) => {
    let milestoneMap: Map<number, number> = new Map([...Array(15)].map((_, i) => [new Date().getFullYear() - 14 + i, 0]));

      state.commex.forEach(comm => {
          const commYear = +comm.commex_date.slice(0,4);
          if(milestoneMap.has(commYear)){
              milestoneMap.set(commYear, milestoneMap.get(commYear)! + 1);
          }
          else{
              milestoneMap.set(commYear, 1);
          }
      })
      state.educs.forEach(educ => {
          const educYear = +educ.year_end.slice(0,4);
          if(milestoneMap.has(educYear)){
              milestoneMap.set(educYear, milestoneMap.get(educYear)! + 1);
          }
          else{
              milestoneMap.set(educYear, 1);
          }
              
      })
      state.certs[0].forEach(cert => {
          const certYear = +(cert.accomplished_date + '').slice(0,4);
          if(milestoneMap.has(certYear)){
              milestoneMap.set(certYear, milestoneMap.get(certYear)! + 1);
          }
          else{
              milestoneMap.set(certYear, 1);
          }
      })


      const sortedMilestone = [...milestoneMap.entries()].sort((a, b) => a[0] - b[0]);
      const ret = sortedMilestone.map(x => x[1]);
      return ret.slice(ret.length - 15, ret.length);
  }
);


export const selectAllProfile = createSelector(
  selectProfileState,
  (state: ProfileState) => state.profile
);

export const selectAllEduc = createSelector(
  selectProfileState,
  (state: ProfileState) => state.educs
);

export const selectFacultyCerts = createSelector(
  selectProfileState,
  (state: ProfileState) => state.certs[0]
);

export const selectCertCount = createSelector(
  selectProfileState,
  (state: ProfileState) => {
    let count = 0;
    state.certs[0].forEach(cert => {count += 1;})
    return count;
  }
);


export const selectAllCerts = createSelector(
  selectProfileState,
  (state: ProfileState) => state.certs[1]
);

export const selectCourseSched = createSelector(
  selectProfileState,
  (state: ProfileState) => state.courses[0]
);

export const selectTotalUnit = createSelector(
  selectProfileState,
  (state: ProfileState) => {
    let units = 0;
    state.courses[0].forEach(course => {units += (course.unit + course.class_count)})
    return units;
  }
);



export const selectCourses = createSelector(
  selectProfileState,
  (state: ProfileState) => state.courses[1]
);


export const selectAllExp = createSelector(
  selectProfileState,
  (state: ProfileState) => state.exps
);

export const selectAllProj = createSelector(
  selectProfileState,
  (state: ProfileState) => state.proj
);

export const selectFacultyExpertise = createSelector(
  selectProfileState,
  (state: ProfileState) => state.expertises[0]
);


export const selectAllExpertise = createSelector(
  selectProfileState,
  (state: ProfileState) => state.expertises[1]
);

export const selectAllEvaluation = createSelector(
  selectProfileState,
  (state: ProfileState) => state.evals
);

export const selectFacultyEvalAverage = createSelector(
  selectProfileState,
  (state: ProfileState) => {
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

export const selectProfileLoading = createSelector(
  selectProfileState,
  (state) => state.isLoading
)

export const selectCommex = createSelector(
  selectProfileState,
  (state: ProfileState) => state.commex
);