import { Injectable } from '@angular/core';
import { Evaluation } from './Interfaces/evaluation';
type ScoreCategory = {
  name: string,
  value: number,
  bgColor?: string;
}

export interface evalScoreHistory {
  'name': string,
  'series': Series[]
}

type Series = {
  'name': string,
  'value': number
}
@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor() { }

  averageEvaluation(param1: number, param2: number, param3: number, param4: number): number {
    return +((+param1 + +param2 + +param3 + +param4) / 4).toFixed(1);
  }

  setEvalScoreCategory(evalSem: Evaluation): ScoreCategory[]{
    return [
      {
        name: "Category 1",
        value: evalSem.param1_score,
        bgColor: "#fbd650"

      },
      {
        name: "Category 2",
        value: evalSem.param2_score,
        bgColor: "#65c280"

      },
      {
        name: "Category 3",
        value: evalSem.param3_score,
        bgColor: "#1f7cb5"

      },
      {
        name: "Category 4",
        value: evalSem.param4_score,
        bgColor: "#ef6540"

      }]
  }

  selectEvalSem(id: number, evaluation: Evaluation[]): ScoreCategory[] {
    let evalItem : Evaluation[] = evaluation.filter((evalItem: Evaluation) => evalItem.evaluation_ID == id)
    let selectedEvalSem = evalItem[0]
    return this.setEvalScoreCategory(selectedEvalSem)
  }

   // Set the evaluation Timeline
   setEvalHistory(evaluation: Evaluation[]): evalScoreHistory[] {
    return [{
      "name": "Evalution Score",
      "series": this.setSeries(evaluation)
    }]
  }

  setSeries(evaluation: Evaluation[]): Series[] {
    return evaluation.map((evalItem: Evaluation) => ({
        name: `${evalItem.semester}${evalItem.semester== 1 ? 'st' : 'nd'}, A.Y. ${evalItem.evaluation_year} - ${+evalItem.evaluation_year + 1}`,
        value: this.averageEvaluation(
            evalItem.param1_score,
            evalItem.param2_score,
            evalItem.param3_score,
            evalItem.param4_score
        )
    }));
  }
}
