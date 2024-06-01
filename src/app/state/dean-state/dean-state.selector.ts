import { createSelector, createFeatureSelector } from "@ngrx/store";
import { DeanState } from "./dean-state.reducer";
import { Evaluation } from "../../services/Interfaces/evaluation";
import { CommunityExtension } from "../../services/Interfaces/community-extension";
import { Faculty } from "../../services/Interfaces/faculty";
import { state } from "@angular/animations";
import { CertificationsFaculty } from "../../services/Interfaces/certifications-faculty";
import { EducationalAttainment } from "../../services/Interfaces/educational-attainment";
import { IndustryExperience } from "../../services/Interfaces/industry-experience";
import { ExpertiseFaculty } from "../../services/Interfaces/expertise-faculty";

const date = new Date();
const currentYear: number  = date.getFullYear();

export const selectDeanState = createFeatureSelector<DeanState>('dean');


export const selectCollegeMilestoneCount = createSelector(
    selectDeanState,
    (state: DeanState) => {
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
        state.certs.forEach(cert => {
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

export const selectAttainmentTimeline = createSelector(
    selectDeanState,
    (state: DeanState) => {
        const floorYear = currentYear - 14;
        let attainmentTimeline = [
            Array.from({ length: 15 }, () => 0),
            Array.from({ length: 15 }, () => 0),
            Array.from({ length: 15 }, () => 0)
        ];

        if(state.certs.length <= 0) return []

        state.certs.forEach(cert => {
            const currYear = +(cert.accomplished_date+'').slice(0,4);
            if(currYear >= floorYear){
                attainmentTimeline[0][currYear - floorYear] += 1
            }
          })

      if(state.commex.length <= 0) return []
      state.commex.forEach(commex => {
        const currYear = +commex.commex_date.slice(0,4);
        if(currYear >= floorYear){
          attainmentTimeline[1][currYear - floorYear] += 1
        }
      })

        state.certs.forEach(cert => {
            const currYear = +(cert.accomplished_date+'').slice(0,4);
            if(currYear >= floorYear && cert.cert_type == "Completion"){
                attainmentTimeline[2][currYear - floorYear] += 1
            }
        })

        attainmentTimeline.map((arr, idx) => {
            arr.map((x, index) => {
                if(index < 14){
                    attainmentTimeline[idx][index + 1] = (attainmentTimeline[idx][index + 1] + x)
                }
            })
        })

        return attainmentTimeline;
    }
);




export const selectAllCollege = createSelector(
    selectDeanState,
    (state: DeanState) => state.colleges
  );

export const selectCollegeFaculty = createSelector(
  selectDeanState,
  (state: DeanState) => state.profile
);

export const selectCollegeEmploymentType = createSelector(
    selectDeanState,
    (state: DeanState) => {
        let employmentType: number[] = [0, 0];

        state.profile.forEach(faculty => {
            faculty.employment_status == 1 ? employmentType[1]  += 1 : employmentType[0] += 1;
        })

        return employmentType;
    }
  );

export const selectCollegeFacultyCount = createSelector(
    selectDeanState,
    (state: DeanState) => state.profile.length
  );


export const selectCollegeLevel = createSelector(
selectDeanState,
(state: DeanState) => {
    let levelList: Map<string, number> = new Map();

    state.profile.forEach(x => {
        if(x.teaching_level == '') return;

        if(levelList.has(x.teaching_level)){
            levelList.set(x.teaching_level, levelList.get(x.teaching_level)! + 1);
        }
        else{
            levelList.set(x.teaching_level, 1);
        }
    }
    )

    const sortedCerts = [...levelList.entries()].sort((a, b) => b[1] - a[1]);
    const ret: [string[], number[]] = [sortedCerts.map(x => x[0]), sortedCerts.map(x => x[1])];

    return ret;
}
);




export const selectAllCollegeEduc = createSelector(
    selectDeanState,
    (state: DeanState) => state.educs
);

export const selectCollegeEducTimeline = createSelector(
    selectDeanState,
    (state: DeanState) => {
        const floorYear = currentYear - 14;
        let educTimeline = [
            Array.from({ length: 15 }, () => 0),
            Array.from({ length: 15 }, () => 0),
            Array.from({ length: 15 }, () => 0)
        ];

        if(state.educs.length <= 0) return []

        state.educs.forEach(educ => {
            const currYear = +educ.year_end.slice(0,4);
            if(currYear >= floorYear){
                if(educ.educ_level == "Bachelor's Degree"){
                    for (let index = currYear - floorYear; index < 15; index++) {
                        educTimeline[0][index] += 1;
                    }
                }
                else if(educ.educ_level == "Master's Degree"){
                    for (let index = currYear - floorYear; index < 15; index++) {
                        educTimeline[1][index] += 1;
                        educTimeline[0][index] -= 1;
                    }
                }
                else{
                    for (let index = currYear - floorYear; index < 15; index++) {
                        educTimeline[2][index] += 1;
                        educTimeline[1][index] -= 1;
                    }
                }
            }
        })

        // console.log(state.educs)

        return educTimeline;
    }
);





export const selectAllExistCerts = createSelector(
    selectDeanState,
    (state: DeanState) => state.certs
);

export const selectCertTypes = createSelector(
    selectDeanState,
    (state: DeanState) => {
        let certTypes: {[key: string]: number} = {};

        state.certs.forEach(cert => {
            const educYear = (cert.accomplished_date + '').slice(0,4);

            if(+educYear == currentYear){
                if(certTypes[cert.cert_type]){
                    certTypes[cert.cert_type] += 1;
                }
                else{
                    certTypes[cert.cert_type] = 1;
                }
            }
        })
        return certTypes;
    }
);

export const selectCommonSeminars = createSelector(
    selectDeanState,
    (state: DeanState) => {
        let certNames: Map<string, number> = new Map();


        state.certs.forEach(cert => {
            if(certNames.has(cert.cert_name)){
                certNames.set(cert.cert_name, certNames.get(cert.cert_name)! + 1);
            }
            else{
                certNames.set(cert.cert_name, 1);
            }
        })

        const sortedCerts = [...certNames.entries()].sort((a, b) => b[1] - a[1]);
        return sortedCerts;
    }
);

export const selectCurrYearAverageSeminarCount = createSelector(
    selectDeanState,
    (state: DeanState) => {
        let certNames: Map<string, number> = new Map();


        state.certs.forEach(cert => {
            let certYear = new Date(cert.accomplished_date).getFullYear()
            if (+certYear === +currentYear && cert.cert_type === "Completion"){
                if(certNames.has(cert.cert_name)){
                    certNames.set(cert.cert_name, certNames.get(cert.cert_name)! + 1);
                }
                else{
                    certNames.set(cert.cert_name, 1);
                }
            }
        })

        const sortedCerts = [...certNames.entries()];
        return sortedCerts.reduce((sum, [_, count]) => sum + count, 0) / state.profile.length;
    }
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

export const selectTeachingLength = createSelector(
    selectDeanState,
    (state: DeanState) => {
        let experienceName: Map<number, [number, number, number]> = new Map();

        //Gets teaching year
        state.exps.forEach(exp => {
            let fromDate = new Date(exp.experience_from).getTime();
            let toDate: number;

            if(exp.experience_to == undefined){
                toDate = new Date().getTime();
            }
            else{
                toDate = new Date(exp.experience_to).getTime();
            }

            let dateDiff = +((toDate - fromDate) / 31536000000).toFixed(2);

            if(experienceName.has(exp.faculty_ID)){
                let currentValue = experienceName.get(exp.faculty_ID)!;
                currentValue[0] += dateDiff;
                experienceName.set(exp.faculty_ID, currentValue);
            }
            else{
                experienceName.set(exp.faculty_ID, [dateDiff, 0, 0]);
            }
        })

        state.certs.forEach(cert => {
            if(experienceName.has(cert.faculty_ID)){
                let currentValue = experienceName.get(cert.faculty_ID)!;
                currentValue[1] += 1;
                experienceName.set(cert.faculty_ID, currentValue);
            }
            else{
                experienceName.set(cert.faculty_ID, [0, 0, 1])
            }
        })

        const yearEvaluation = state.evals.filter((evaluation: Evaluation) => evaluation.evaluation_year == currentYear);
        const params: number[] = Array.from({ length: 6 }, () => 0);

        // Gets evaluation average for current year of each faculty member
        yearEvaluation.forEach((evaluation: Evaluation) => {
            let average = (+evaluation.param1_score + +evaluation.param2_score + +evaluation.param3_score + +evaluation.param4_score + +evaluation.param5_score + +evaluation.param6_score) / 6;
            if(experienceName.has(evaluation.faculty_ID)){
                let currentValue = experienceName.get(evaluation.faculty_ID)!;
                currentValue[1] == 0 ? currentValue[1] += average : currentValue[1] = (currentValue[1] + average) / 2
                experienceName.set(evaluation.faculty_ID, currentValue);
            }
            else{
                experienceName.set(evaluation.faculty_ID, [0, average, 0])
            }
        });

        const sortedTeaching = [...experienceName.entries()];
        // return sortedTeaching;
        return [sortedTeaching.map(x => [x[1][0], x[1][1]]), [sortedTeaching.map(x => x[1][0]), sortedTeaching.map(x => x[1][1])]];
        // return [sortedTeaching.map(x => x[0]), sortedTeaching.map(x => x[1][0]), sortedTeaching.map(x => x[1][1]), sortedTeaching.map(x => x[1][2])]
    }
);




export const selectAllProj = createSelector(
    selectDeanState,
    (state: DeanState) => state.proj
);

export const selectAllExpertise = createSelector(
    selectDeanState,
    (state: DeanState) => state.expertises[1]
);

export const selectFacultyExpertise = createSelector(
    selectDeanState,
    (state: DeanState) => state.expertises[0]
);

export const selectTopExpertise = createSelector(
    selectDeanState,
    (state: DeanState) => {
        let expertiseNames: Map<string, number> = new Map();


        state.expertises[0].forEach(exp => {
            if(expertiseNames.has(exp.expertise_name)){
                expertiseNames.set(exp.expertise_name, expertiseNames.get(exp.expertise_name)! + 1);
            }
            else{
                expertiseNames.set(exp.expertise_name, 1);
            }
        })

        const sortedCerts = [...expertiseNames.entries()].sort((a, b) => b[1] - a[1]);
        const ret: [string[], number[]] = [sortedCerts.map(x => x[0]), sortedCerts.map(x => x[1])];
        return ret;
    }
);



export const selectAllEvaluation = createSelector(
    selectDeanState,
    (state: DeanState) => state.evals
);

export const selectOverallAverageTimeline = createSelector(
    selectDeanState,
    (state: DeanState) => {
        let overallTimeline = Array.from({ length: 15 }, () => 0)
        let floorYear = currentYear - 14;

        state.evals.forEach(ev =>{
            if(ev.evaluation_year >= floorYear){
                const paramAverage = (
                    +ev.param1_score +
                    +ev.param2_score +
                    +ev.param3_score +
                    +ev.param4_score +
                    +ev.param5_score +
                    +ev.param6_score) / 6;

                if(overallTimeline[ev.evaluation_year - floorYear] == 0){
                    overallTimeline[ev.evaluation_year - floorYear] = paramAverage;
                }
                else{
                    overallTimeline[ev.evaluation_year - floorYear] = (overallTimeline[ev.evaluation_year - floorYear] + paramAverage) / 2;
                }

            }
        })

        return overallTimeline;
    }
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

export const selectAllAverageTimeline = createSelector(
    selectDeanState,
    (state: DeanState) => {
      // Key => ID, Value: Name, eval History []
        let averageTimeline: Map<number, [string, number[], string, string]> = new Map();

        // Range from years 14 previous + now
        let floorYear = currentYear - 14;

        state.evals.forEach(faculty => {
            const id = faculty.faculty_ID;
            const paramAverage = (
                +faculty.param1_score +
                +faculty.param2_score +
                +faculty.param3_score +
                +faculty.param4_score +
                +faculty.param5_score +
                +faculty.param6_score) / 6

            //If faculty already exists in map
            if(averageTimeline.has(id)){

                //Check if it has an assigned average already
                if(averageTimeline.get(id)![1][faculty.evaluation_year - floorYear] != 0){
                    averageTimeline.get(id)![1][faculty.evaluation_year - floorYear] = (averageTimeline.get(id)![1][faculty.evaluation_year - floorYear] + paramAverage) / 2;
                    averageTimeline.set(id, [averageTimeline.get(id)![0], averageTimeline.get(id)![1], averageTimeline.get(id)![2], averageTimeline.get(id)![3]])
                }
                else{
                    averageTimeline.get(id)![1][faculty.evaluation_year - floorYear] = paramAverage;
                    averageTimeline.set(id, [averageTimeline.get(id)![0], averageTimeline.get(id)![1], averageTimeline.get(id)![2], averageTimeline.get(id)![3]])
                }
            }
            else{
              // Init map name with eval history to 0
                averageTimeline.set(id, [faculty.first_name + " " + faculty.last_name,  Array.from({ length: 15 }, () => 0), getPosition(state.profile, faculty.faculty_ID), getCollege(state.profile, faculty.faculty_ID)]);
                // console.log(faculty.evaluation_year - floorYear + "= " + paramAverage)
                averageTimeline.get(id)![1][faculty.evaluation_year - floorYear] = paramAverage;
                averageTimeline.set(id, [averageTimeline.get(id)![0], averageTimeline.get(id)![1], averageTimeline.get(id)![2], averageTimeline.get(id)![3]]);
            }
        })

        return [...averageTimeline.entries()];
    }
);


export const selectEvaluationDifference = createSelector(
    selectDeanState,
    (state: DeanState) => {
        let differenceMap: Map<number, [string, number]> = new Map();
        //Stores the latest, if an older copy is found, add the difference to the actual map.
        let tempMap: Map<number, [string, number]> = new Map();

        let floorYear = currentYear - 14;
        let sem: number;
        date.getMonth() <= 5 ? sem = 1 : sem = 2;


        state.evals.forEach(ev => {

            if(ev.evaluation_year == currentYear && ev.semester == sem){
                const paramAverage = (
                    +ev.param1_score +
                    +ev.param2_score +
                    +ev.param3_score +
                    +ev.param4_score +
                    +ev.param5_score +
                    +ev.param6_score) / 6

                tempMap.set(ev.faculty_ID, [ev.first_name + " " + ev.last_name, +paramAverage]);
            }
        })

        state.evals.forEach(ev => {
            if((sem == 2 && ev.evaluation_year == currentYear && ev.semester == 1) || (sem == 1 && ev.evaluation_year == (currentYear - 1) && ev.semester == 2)){
                const paramAverage = (
                    +ev.param1_score +
                    +ev.param2_score +
                    +ev.param3_score +
                    +ev.param4_score +
                    +ev.param5_score +
                    +ev.param6_score) / 6;

                if(tempMap.has(ev.faculty_ID)){
                    differenceMap.set(ev.faculty_ID, [(ev.first_name + " " + ev.last_name), (+tempMap.get(ev.faculty_ID)![1] - +paramAverage)])
                }
            }
        })
        let tempArr = [...differenceMap.entries()];

        return [tempArr.map(x => x[0]), tempArr.map(x => x[1][0]), tempArr.map(x => x[1][1])];

    }
);

export const selectCurrentEvaluation = createSelector(
    selectDeanState,
    (state: DeanState) => {
        let sem: number;
        let radioEvaluation: Map<string, (number | string)[]> = new Map();
        date.getMonth() <= 5 ? sem = 1 : sem = 2;

        state.evals.forEach(evaluation => {
            if(evaluation.evaluation_year == currentYear && evaluation.semester == sem){
                radioEvaluation.set(
                    evaluation.first_name + " " + evaluation.last_name,
                    [evaluation.param1_score,
                    evaluation.param2_score,
                    evaluation.param3_score,
                    evaluation.param4_score,
                    evaluation.param5_score,
                    evaluation.param6_score,
                    getPosition(state.profile, evaluation.faculty_ID),
                    getCollege(state.profile, evaluation.faculty_ID),
                    evalAverage(+evaluation.param1_score,
                      +evaluation.param2_score,
                      +evaluation.param3_score,
                      +evaluation.param4_score,
                      +evaluation.param5_score,
                      +evaluation.param6_score).toFixed(2)
                  ]
                )
            }
        })

        return [...radioEvaluation.entries()];
    }
)

export const selectEvalLoading = createSelector(
  selectDeanState,
  (state) => state.evalsLoading
)

export const selectCollegeCommex = createSelector(
    selectDeanState,
    (state: DeanState) => state.commex
);


function getPosition(faculties: Faculty[], faculty_ID: number) {
  const copyFaculties = [...faculties]

  return copyFaculties.find(faculty => faculty.faculty_ID == faculty_ID)!.teaching_level

}

function getCollege(faculties: Faculty[], faculty_ID: number) {
  const copyFaculties = [...faculties]

  return copyFaculties.find(faculty => faculty.faculty_ID == faculty_ID)!.college_abbrev

}

function evalAverage(num1: number, num2: number,num3: number,num4: number,num5: number, num6: number,) {
  return (+num1 + num2 +num3 +num4 +num5 + num6)/6
}













//Faculty analytics selectors
//Selectors on faculty state are hardcoded to only request data based on cookies, so i have to copypasta code here then apply facultyid filter
export const selectProfile = (id: number) => createSelector(
    selectDeanState,
    (state: DeanState) => {
        console.log(id)
    }
);


export const selectFacultyEvalAverage = (id: number) => createSelector(
    selectDeanState,
    (state: DeanState) => {


        //Filters entire evaluation to current year only
        const yearEvaluation = state.evals.filter((evaluation: Evaluation) => evaluation.evaluation_year == currentYear && evaluation.faculty_ID == id);
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


export const selectTotalUnit = (id: number) => createSelector(
    selectDeanState,
    (state: DeanState) => {
        let units = 0;
        state.courses[0].forEach(course => {
            if(course.faculty_ID === id){
                units += (course.unit + course.class_count)
            }
        })
        return units;
    }
);

export const selectCertCount = (id: number) => createSelector(
    selectDeanState,
    (state: DeanState) => {
        let count = 0
        state.certs.forEach(cert => {
            if(cert.faculty_ID === id){
                count += 1;
            }
        })
        return count;
    }
);


export const selectSeminarCount = (id: number) => createSelector(
    selectDeanState,
    (state: DeanState) => {
      let count = 0;
      state.certs.forEach(cert => {
        if(cert.cert_type == 'Completion' && cert.faculty_ID === id){
          count += 1;
        }
      })
      return count;
    }
  );

export const selectMilestoneCount = (commex: CommunityExtension[], id: number) => createSelector(
    selectDeanState,
    (state: DeanState) => {
        let milestoneMap: Map<number, number> = new Map([...Array(15)].map((_, i) => [new Date().getFullYear() - 14 + i, 0]));

        commex.forEach(comm => {
            if(comm.faculty_ID !== id) return

            const commYear = +comm.commex_date.slice(0,4);
            if(milestoneMap.has(commYear)){
                milestoneMap.set(commYear, milestoneMap.get(commYear)! + 1);
            }
            else{
                milestoneMap.set(commYear, 1);
            }
        })
        state.educs.forEach(educ => {
            if(educ.faculty_ID !== id) return

            const educYear = +educ.year_end.slice(0,4);
            if(milestoneMap.has(educYear)){
                milestoneMap.set(educYear, milestoneMap.get(educYear)! + 1);
            }
            else{
                milestoneMap.set(educYear, 1);
            }

        })
        state.certs.forEach(cert => {
            if(cert.faculty_ID !== id) return

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

export const selectFacultyReport = createSelector(selectDeanState, (state)=> {

  if(state.profile.length < 0) return

  state.profile.map(prof => {

    let degree = getDegree(state.educs, prof.faculty_ID)
    let data = {
      "Name" : (prof.teaching_position.toLocaleUpperCase() !== 'INSTRUCTOR' ? prof.teaching_position.toLocaleUpperCase() + " " : "")  + prof.last_name + prof.ext_name+ ', '+ prof.first_name + ' ' + prof.middle_name,
      "Employment Status (FT/PT)": prof.employment_status == 0 ? "Part-time" : "Full-time",
      "Teaching year experience": calculateTeachingYear(state.educs, state.exps, prof.faculty_ID) + " year/s"
    }

    data = {...data, ...degree}

    console.log(data)
  })
})

function getCerts(certs: CertificationsFaculty[], faculty_ID: number) {


}

function calculateTeachingYear(educs: EducationalAttainment[], experience: IndustryExperience[], faculty_ID: number) {

  const experienceYears =      experience.filter(item => item.faculty_ID == faculty_ID).filter(item => item.teaching_related == 1).map(item => item.experience_from)

  const educYears =     educs.filter(item => item.faculty_ID == faculty_ID).map(item => item.year_start)



  const years = [...experienceYears, ...educYears]

  if(years.length <= 0) return 0

  const formattedYear = years.map(year => new Date(year).getFullYear())

  const minYear = Math.min(...formattedYear);

  if(Number.isNaN(minYear)) return 0

  const currentYear = new Date().getFullYear();

  const yearLength = currentYear - minYear;

  return yearLength
}

function getDegree(educs: EducationalAttainment[], faculty_ID: number) {

  return {
    "Baccaleurate": educs.filter((item) => faculty_ID == item.faculty_ID).
                    filter(item => item.educ_level.toLocaleLowerCase() === "bachelor\'s degree").
                    map(item => item.educ_title).join(", "),
    "Masterals": educs.filter((item) => faculty_ID == item.faculty_ID).
                    filter(item => item.educ_level.toLocaleLowerCase() === "master\'s degree").
                    map(item => item.educ_title).join(", "),
    "Doctorate": educs.filter((item) => faculty_ID == item.faculty_ID).
                    filter(item => item.educ_level.toLocaleLowerCase() === "doctorate degree").
                    map(item => item.educ_title).join(", "),
    "Associate": educs.filter((item) => faculty_ID == item.faculty_ID).
                    filter(item => item.educ_level.toLocaleLowerCase() === "associate's degree").
                    map(item => item.educ_title).join(", ")
  }
}
function getExperience(experience: IndustryExperience[], faculty_ID: number) {

}

function getExpertise(expertise: ExpertiseFaculty[], faculty_ID: number) {
}

export const selectAttainmentTimelineFaculty = (commex: CommunityExtension[], id: number) => createSelector(
    selectDeanState,
    (state: DeanState) => {
        const floorYear = currentYear - 14;
        let attainmentTimeline = [
            Array.from({ length: 15 }, () => 0),
            Array.from({ length: 15 }, () => 0),
            Array.from({ length: 15 }, () => 0)
        ];

        state.certs.forEach(cert => {
            if(cert.faculty_ID !== id) return

            const currYear = +(cert.accomplished_date+'').slice(0,4);
            if(currYear >= floorYear){
                attainmentTimeline[0][currYear - floorYear] += 1
            }
        })

        state.commex.forEach(commex => {
            if(commex.faculty_ID !== id) return

            const currYear = +commex.commex_date.slice(0,4);
            if(currYear >= floorYear){
                attainmentTimeline[1][currYear - floorYear] += 1
            }
        })

        state.certs.forEach(cert => {
            if(cert.faculty_ID !== id) return

            const currYear = +(cert.accomplished_date+'').slice(0,4);
            if(currYear >= floorYear && cert.cert_type == "Completion"){
                attainmentTimeline[2][currYear - floorYear] += 1
            }
        })

        attainmentTimeline.map((arr, idx) => {
            arr.map((x, index) => {
                if(index < 14){
                    attainmentTimeline[idx][index + 1] = (attainmentTimeline[idx][index + 1] + x)
                }
            })
        })


        return attainmentTimeline;
    }
  );

  export const selectProfileOne = (faculty_ID : number) => createSelector(
    selectDeanState,
    (state: DeanState) => getProfile(faculty_ID, state.profile))


    export const selectCollegeLoading = createSelector(
      selectDeanState,
      (state: DeanState) => state.collegeLoading
    )

    export const selectProfileLoading = createSelector(
      selectDeanState,
      (state: DeanState) => state.profileLoading
    )

    export const selectCertsLoading = createSelector(
      selectDeanState,
      (state: DeanState) => state.certsLoading
    )

    export const selectEducsLoading = createSelector(
      selectDeanState,
      (state: DeanState) => state.educsLoading
    )

    export const selectExpsLoading = createSelector(
      selectDeanState,
      (state: DeanState) => state.expsLoading
    )

    export const selectProjLoading = createSelector(
      selectDeanState,
      (state: DeanState) => state.projLoading
    )

    export const selectExptLoading = createSelector(
      selectDeanState,
      (state: DeanState) => state.exptLoading
    )

    export const selectCoursesLoading = createSelector(
      selectDeanState,
      (state: DeanState) => state.coursesLoading
    )

    export const selectCommexLoading = createSelector(
      selectDeanState,
      (state: DeanState) => state.commexLoading
    )

  function getProfile(faculty_ID: number, faculties: Faculty[]) {


    const facultyCopy = [...faculties]
    console.log(facultyCopy.filter((item) => item.faculty_ID == faculty_ID))
    console.log(faculty_ID)
return facultyCopy.find((item) => item.faculty_ID == faculty_ID)
  }
