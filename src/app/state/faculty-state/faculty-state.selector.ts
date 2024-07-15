import { createSelector, createFeatureSelector } from "@ngrx/store";
import { ProfileState } from "./faculty-state.reducer";
import { Evaluation } from "../../services/Interfaces/evaluation";
import { MilestoneReport } from "../../services/Interfaces/milestoneReport";
import { Certifications } from "../../services/Interfaces/certifications";
import { CertificationsFaculty } from "../../services/Interfaces/certifications-faculty";

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

export const milestoneReport = createSelector(
  selectProfileState,
  (state) => {

    const yearsArray: string[] = Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() - 14) + i).map(String);

    const milestoneReport: MilestoneReport[] = []

      let prevCommex = 0
      let prevEduc = 0
      let prevCert = 0
      let prevYear = 0
      yearsArray.map(year => {
        let currCommex = state.commex.filter(item => year === new Date(item.commex_date.split("-")[0]).getFullYear()+"").length
        let currEduc = state.educs.filter(item => year === new Date(item.year_end.split("-")[0]).getFullYear()+"").length
        let currCert = state.certs[0].filter(item => year === new Date((item.accomplished_date + '').split("-")[0]).getFullYear()+"").length
        let currYear = currCommex + currEduc + currCert

        let changeEduc = prevEduc ? (((currEduc - prevEduc) / prevEduc) * 100).toFixed(2) + '%' : '-'
        let changeCert = prevCert ? (((currCert - prevCert) / prevCert) * 100).toFixed(2) + '%' : '-'
        let changeCommex = prevCommex ? (((currCommex - prevCommex) / prevCommex) * 100).toFixed(2) + '%' : '-'
        let changeYear = prevYear ? (((currYear - prevYear) / prevYear) * 100).toFixed(2) + '%' : '-'

        let data: MilestoneReport = {
          "Year": year,
          "Community Extensions Attended": currCommex,
          "Community Extensions Attended Change from Previous Year (%)" : changeCommex,
          "Educational Attainment": currEduc,
          "Educational Attainment Change from Previous Year (%)" : changeEduc,
          "Certificates Received": currCert,
          "Certificates Received Change from Previous Year (%)" : changeCert,
          "Total Milestone": currYear,
          "Milestone Change from Previous Year (%)": changeYear
        }

        prevCommex = currCommex
        prevEduc = currEduc
        prevCert = currCert
        prevYear = currYear

        milestoneReport.push(data)
      })


      return milestoneReport
  }
)

export const selectAttainmentTimeline = createSelector(
  selectProfileState,
  (state: ProfileState) => {
      const floorYear = currentYear - 14;
      let attainmentTimeline = [
          Array.from({ length: 15 }, () => 0),
          Array.from({ length: 15 }, () => 0),
          Array.from({ length: 15 }, () => 0)
      ];

      state.certs[0].forEach(cert => {
          const currYear = +(cert.accomplished_date+'').slice(0,4);
          if(currYear >= floorYear){
              attainmentTimeline[0][currYear - floorYear] += 1
          }
      })

      state.commex.forEach(commex => {
          const currYear = +commex.commex_date.slice(0,4);
          if(currYear >= floorYear){
              attainmentTimeline[1][currYear - floorYear] += 1
          }
      })

      state.certs[0].forEach(cert => {
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


export const selectAllProfile = createSelector(
  selectProfileState,
  (state: ProfileState) => state.profile
);

export const selectCollegeAbbrev = createSelector(
  selectProfileState,
  (state: ProfileState) => state.profile?.college_abbrev
);

export const selectPrivilege = createSelector(
  selectProfileState,
  (state: ProfileState) => state.profile?.teaching_position
);

export const selectPasswordLoading = createSelector(
  selectProfileState,
  (state: ProfileState) => state.passwordLoading
)
export const selectEditLoading = createSelector(
  selectProfileState,
  (state: ProfileState) => state.editLoading
)
export const selectPasswordError = createSelector(
  selectProfileState,
  (state: ProfileState) => state.passwordError
)
export const selectProfileID = createSelector(
  selectProfileState,
  (state: ProfileState) => state.profile!.faculty_ID
);

export const selectAllEduc = createSelector(
  selectProfileState,
  (state: ProfileState) => state.educs
);

export const selectAnEduc = (educ_ID: number) => createSelector(
  selectProfileState,
  (state) => {

    if(state.educs.length <= 0 ) return

    return state.educs.filter(item => item.educattainment_ID == educ_ID)[0]
  }
)

export const selectFacultyCerts = createSelector(
  selectProfileState,
  (state: ProfileState) => state.certs[0]
);

export const selectFilteredFacultyCerts = createSelector(
  selectProfileState,
  (state: ProfileState) => {
    let speakership: CertificationsFaculty[] = [];
    let completion: CertificationsFaculty[] = [];
    let achievement: CertificationsFaculty[] = [];
    let appreciation: CertificationsFaculty[] = [];
    let recognition: CertificationsFaculty[] = [];
    let participation: CertificationsFaculty[] = [];


    state.certs[0].forEach(cert => {
      // console.log(cert);
      switch (cert.cert_type) {
        case 'Speakership':
          speakership.push(cert);
          break;

        case 'Completion':
          completion.push(cert);
          break;


        case 'Achievement':
          achievement.push(cert);
          break;

        case 'Appreciation':
          appreciation.push(cert);
          break;

        case 'Recognition':
          recognition.push(cert);
          break;

        case 'Participation':
          participation.push(cert);
          break;


        default:
          break;
      }
    })
    let ret: CertificationsFaculty[][] = [speakership, completion, achievement, appreciation, recognition, participation];
    return ret;
  }
);

export const selectCertCount = createSelector(
  selectProfileState,
  (state: ProfileState) => {
    let count = 0;
    state.certs[0].forEach(cert => {count += 1;})
    return count;
  }
);

export const selectSeminarCount = createSelector(
  selectProfileState,
  (state: ProfileState) => {
    let count = 0;
    state.certs[0].forEach(cert => {
      if(cert.cert_type == 'Completion'){
        count += 1;
      }
    })
    return count;
  }
);


export const selectAllCerts = createSelector(
  selectProfileState,
  (state: ProfileState) => state.certs[1]
);

export const selectAnCert = (cert_ID: number) => createSelector(
  selectProfileState,
  (state) => {
    if(state.certs[1].length <= 0 ) return

    return state.certs[1].filter(item => item.cert_ID == cert_ID)[0]
  }
)

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

export const selectAnExp = (exp_ID: number) => createSelector(
  selectProfileState,
  (state) => {

    if(state.exps.length <= 0) return

    return state.exps.filter(item => item.experience_ID == exp_ID)[0]
  }
)

export const selectAllProj = createSelector(
  selectProfileState,
  (state: ProfileState) => {
  return  state.proj
  }
);

export const selectFacultyResearch = createSelector(
  selectProfileState,
  (state: ProfileState) => state.research[0]
);

export const selectFacultyResearchAuthor = createSelector(
  selectProfileState,
  (state: ProfileState) => {

    console.log(state.research[1])
    return state.research[1]
  }
);

export const selectFacultyExpertise = createSelector(
  selectProfileState,
  (state: ProfileState) => state.expertises[0]
);

export const selectAnExpertise = (expert_ID: number) => createSelector(
  selectProfileState,
  (state) => {
    if(state.expertises[0].length <= 0) return

    return state.expertises[0].filter(item => item.expertise_ID == expert_ID)[0]
  }
)

export const selectAllExpertise = createSelector(
  selectProfileState,
  (state: ProfileState) => state.expertises[1]
);

export const selectAllEvaluation = createSelector(
  selectProfileState,
  (state: ProfileState) => {
    if(state.evals.length <= 0 ) return
    return state.evals
  }
);

export const selectEvaluationReport = createSelector(
  selectProfileState,
  (state) => {
    if(state.evals.length <= 0 ) return

    let evalReport: object[] = []
    let prevAve = 0

    sortByEvaluationYear(state.evals).map(item => {
      let currAve = item.evalAverage
      let changeAve = prevAve ? ((currAve - prevAve)/ prevAve * 100).toFixed(2) + '%' : '-'
      let data= {
        "Year": item.evaluation_year,
        "Year End": item.evaluation_year_end,
        "Semester": item.semester == 3 ? 'Midyear' : item.semester,
        "Knowledge of Content": item.param1_score,
        "Instructional Skills": item.param2_score,
        "Communication Skills": item.param3_score,
        "Teaching for Independent Learning": item.param4_score,
        "Management of Learning": item.param5_score,
        "Flexible Learning Modality": item.param5_score,
        "Evaluation Average": currAve,
        "Change from Previous Year (%)": changeAve
      }

      prevAve = currAve
      evalReport = [...evalReport, data]
      // this.evalReport.push(data)
    })

    // console.log(evalReport)
    return evalReport
  }
)

export const selectSortedEvals = createSelector(
  selectProfileState,
  (state: ProfileState) => sortByEvaluationYear(state.evals)
)

export const selectEvalData = createSelector(
  selectProfileState,
  (state) => {
    if(state.evals.length <= 0) return

    const sortedEvals = sortByEvaluationYear(state.evals);
    const sem = sortedEvals.map(x => {

      // Fix the year
      const year = parseInt(x.evaluation_year+'')
      const yearEnd = parseInt(x.evaluation_year_end+'')
      return x.semester == 1 ? `1st Sem. A.Y ${year}-${yearEnd}` : x.semester == 2 ? `2nd Sem. A.Y ${year}-${yearEnd}` : `Midyear A.Y ${year}-${yearEnd}`

    })

    const data: [string[], number[]] = [sem, sortedEvals.map(x => parseFloat(evalAverage(
      x.param1_score,
      x.param2_score,
      x.param3_score,
      x.param4_score,
      x.param5_score,
      x.param6_score,
    ).toFixed(2)))]

    return data
  }
)

function evalAverage(p1: number,p2: number,p3: number,p4: number,p5: number,p6: number) {

  return (+p1 + +p2 + +p3 + +p4 + +p5 + +p6)/6;
}

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

export const selectPRofileCollege = createSelector(
  selectProfileState,
  (state) => {

  if(state.profile === undefined) return

  return state.profile?.college_abbrev
  }
)

function sortByEvaluationYear(evals : Evaluation[]) {

  const evalsCopy = [...evals]
  return evalsCopy.sort((a, b) => {
      return a.evaluation_year - b.evaluation_year;
  });
}

export const selectEducDocs = (educ_ID : number) => createSelector(
  selectProfileState,
  (state) => {

    return state.educSupportDocs.filter(item => item.educattainment_ID == educ_ID)
  }
)

export const selectCertDocs = (cert_ID : number) => createSelector(
  selectProfileState,
  (state) => {

    return state.certsSupportDocs.filter(item => item.cert_attainment_ID == cert_ID)
  }
)
export const selectExpDocs = (exp_ID : number) => createSelector(
  selectProfileState,
  (state) => {

    return state.expertiseSupportDocs.filter(item => item.expertise_faculty_ID == exp_ID)
  }
)
export const selectIndustryDocs = (experience_ID : number) => createSelector(
  selectProfileState,
  (state) => {

    return state.industrySupportDocs.filter(item => item.experience_ID == experience_ID)
  }
)

export const selectClearArray = createSelector(
  selectProfileState,
  (state) => {

    return state.clearArray
  }
)

