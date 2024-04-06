import { Component, Inject, OnInit } from '@angular/core';
import { FacultyRequestService } from '../../services/faculty/faculty-request.service';
import { Router } from '@angular/router';
import { Evaluation } from '../../services/Interfaces/evaluation';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { CommonModule, NgFor } from '@angular/common';
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component';
import { EvaluationService } from '../../services/evaluation.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

type Series = {
  'name': string,
  'value': number
}

type ScoreCategory = {
    name: string,
    value: number
    bgColor?: string
  }

export interface evalScoreHistory {
  'name': string,
  'series': Series[]

}

@Component({
  selector: 'evaluation-form-component',
  templateUrl: 'evaluation-form.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule
  ],
})

export class EvaluationForm {
  constructor(
    public dialogRef: MatDialogRef<EvaluationForm>,
    @Inject(MAT_DIALOG_DATA) public data: Evaluation,
  ) {}

  evalForm = new FormGroup({
    semester: new FormControl(''),
    evaluation_year: new FormControl(''),
		param1_score: new FormControl(''),
		param2_score: new FormControl(''),
		param3_score: new FormControl(''),
		param4_score: new FormControl(''),
		param5_score: new FormControl(''),
		param6_score: new FormControl(''),
	})

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm(){
    console.log(this.evalForm);
  }
}







@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [NgxChartsModule, CommonModule, NgFor, LoadingScreenComponent],
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.css'
})
export class EvaluationComponent implements OnInit{

  isLoading: boolean = true;
  evaluation: Evaluation[] = [];
  evalScoreCategory: ScoreCategory[] = [
    {name: "", value: 0, bgColor: ''},
    {name: "", value: 0, bgColor: ''},
    {name: "", value: 0, bgColor: ''},
    {name: "", value: 0, bgColor: ''},
    {name: "", value: 0, bgColor: ''},
    {name: "", value: 0, bgColor: ''}
  ]
  selectedEvalSem: Evaluation = {
    evaluation_ID: 0,
    faculty_ID: 0,
    semester: 0,
    evaluation_year: 0,
    param1_score: 0,
    param2_score: 0,
    param3_score: 0,
    param4_score: 0,
    param5_score: 0,
    param6_score: 0,
    evalAverage: 0
  }
  evalHistory: evalScoreHistory[] = []

  constructor(
    private facultyService: FacultyRequestService,
    private router: Router,
    private evaluationService: EvaluationService,
    public dialog: MatDialog){}

  ngOnInit(): void {
    this.getEvaluation();

  }

  formToggle: boolean = false;

  openDialog(){
    const dialogRef = this.dialog.open(EvaluationForm);
  }

  // Initial Fetching of faculty evaluation
  getEvaluation() {
    this.facultyService.fetchData(this.evaluation, 'getevaluation/fetchEvaluation').subscribe({
      next: (evalItem: Evaluation[]) => this.evaluation = evalItem,
      error: error => {
        if (error.status == 403) {
          console.log(error);
          this.router.navigate(['/']);
        }
      },
      complete: () => {
        this.evaluation = this.evaluation.map((evalItem) => {
          return {
            ...evalItem,
            "evalAverage": parseFloat(((
                      +evalItem.param1_score +
                      +evalItem.param2_score +
                      +evalItem.param3_score +
                      +evalItem.param4_score +
                      +evalItem.param5_score +
                      +evalItem.param6_score
            ) / 6).toFixed(1))
          }
        })
        this.evalHistory = this.evaluationService.setEvalHistory(this.evaluation)
        this.selectedEvalSem = this.evaluation[this.evaluation.length - 1]
        this.selectEvalSem()
        this.isLoading = false
      }
    })
  }

  // Select a specific evaluation history
  selectEvalSem(id?: number): void {
    if(id) {
      let evalItem : Evaluation[] = this.evaluation.filter((evalItem: Evaluation) => evalItem.evaluation_ID == id)
      this.selectedEvalSem = evalItem[0]
      this.evalScoreCategory = this.evaluationService.setEvalScoreCategory(this.selectedEvalSem)

    } else {
      this.evalScoreCategory = this.evaluationService.setEvalScoreCategory(this.selectedEvalSem)
    }
  }

  view: [] = [];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Semester';
  yAxisLabel: string = 'Evaluation Average';
  timeline: boolean = true;

  colorScheme = {name: 'myScheme',
  selectable: true,
  group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };


  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
