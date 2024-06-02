import { Component, Inject, Renderer2, ElementRef, SimpleChanges } from '@angular/core';
import { FacultyRequestService } from '../../services/faculty/faculty-request.service';
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
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { selectAllEvaluation, selectPRofileCollege, selectSortedEvals } from '../../state/faculty-state/faculty-state.selector';
import { Store, select } from '@ngrx/store';
import { loadEval } from '../../state/faculty-state/faculty-state.actions';
import { EmptyTitleComponent } from '../../components/empty-title/empty-title.component';
import { Subscription, filter, take } from 'rxjs';
import { ExcelServiceService } from '../../service/excel-service.service';

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
  styleUrl: 'evaluation-form.component.css',
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
  [x: string]: any;
  constructor(
    public facultyRequest: FacultyRequestService,
    public dialogRef: MatDialogRef<EvaluationForm>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  evalForm = new FormGroup({
    semester: new FormControl(''),
    evaluation_year: new FormControl(''),
    param1_score: new FormControl('', [Validators.max(5), Validators.min(0)]),
    param2_score: new FormControl('', [Validators.max(5), Validators.min(0)]),
    param3_score: new FormControl('', [Validators.max(5), Validators.min(0)]),
    param4_score: new FormControl('', [Validators.max(5), Validators.min(0)]),
    param5_score: new FormControl('', [Validators.max(5), Validators.min(0)]),
    param6_score: new FormControl('', [Validators.max(5), Validators.min(0)]),
  })

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm() {
    console.log(this.evalForm);
    //Post request on form
    this.facultyRequest.postData(this.evalForm, "addEval").subscribe({
      next: value => {
        console.log(value);
        this.onNoClick();
      },
      error: err => console.log(err)
    })
  }
}

@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [NgxChartsModule, CommonModule, NgFor, LoadingScreenComponent, EmptyTitleComponent],
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.css'
})
export class EvaluationComponent{

  isLoading: boolean = true;
  evaluation$ = this.store.select(selectAllEvaluation);
  sortedEvaluation$ = this.store.select(selectSortedEvals);
  evalScoreCategory!: ScoreCategory[]
  selectedEvalSem!: Evaluation
  evalHistory: evalScoreHistory[] = []
  evalBar!: HTMLElement
  evalReport: object[] = []
  currSem = this.excelService.getSemester(new Date().getMonth()+'', new Date().getFullYear()).semester + " Semester, A.Y. "+ this.excelService.getSemester(new Date().getMonth()+'', new Date().getFullYear()).academicYear

  collegeSubscription!: Subscription
  college!: string

  evalReportSubscription!: Subscription
  constructor(
    private evaluationService: EvaluationService,
    public dialog: MatDialog,
    private excelService: ExcelServiceService,
    private store: Store) {
      this.sortedEvaluation$.subscribe({
        next: value => {
          this.evalHistory = this.evaluationService.setEvalHistory(value)
          this.selectedEvalSem = value[value.length - 1]
          this.selectEvalSem(undefined)
          this.isLoading = false
        },



      })
      // this.evaluation$.subscribe({
      //   next: value => {
      //     const sortedEvals = this.sortByEvaluationYear(value)
      //     this.evalHistory = this.evaluationService.setEvalHistory(sortedEvals)
      //     this.selectedEvalSem = sortedEvals[sortedEvals.length - 1]
      //     this.selectEvalSem(undefined)
      //     this.isLoading = false

      //   },
      // })
    }

    ngOnInit() {
      this.evalReportSubscription = this.store.pipe(
        select(selectAllEvaluation),
        filter(data => !!data),
        take(1)
      ).subscribe({
        next: res => {
          let prevAve = 0
          this.sortByEvaluationYear(res!).map(item => {

            let currAve = item.evalAverage
            let changeAve = prevAve ? ((currAve - prevAve)/ prevAve * 100).toFixed(2) + '%' : '-'
            let data= {
              "Year": item.evaluation_year,
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
            this.evalReport.push(data)
          })

          console.log(this.evalReport)
        }
      })

      this.collegeSubscription = this.store.pipe(
        select(selectPRofileCollege),
        filter(data => !!data),
        take(1)
      ).subscribe({
        next: res => this.college = res!
      })

    }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("This is running!");
  }

  ngOnDestory() {
    this.evalReportSubscription.unsubscribe()
    this.collegeSubscription.unsubscribe()
  }
  formToggle: boolean = false;
  // this.store.select(selectAllEvaluation);

  openDialog() {
    let yearVal: any;
    let semVal: any;
    this.evaluation$.subscribe({
      next: value => {
        yearVal = value![value!.length-1].evaluation_year
        semVal = value![value!.length-1].semester
      }
    })

    const dialogRef = this.dialog.open(EvaluationForm, {
      data: {
        year: yearVal,
        sem: semVal
      }
      //Refreshes data after submit
    }).afterClosed().subscribe(result => {
      this.store.dispatch(loadEval());
    });
  }

  // Select a specific evaluation history
  selectEvalSem(event: any | undefined): void {
    if (event !== undefined) {
      let evalItem!: Evaluation[]

      this.evaluation$.subscribe({
        next: value => evalItem = value!.filter((evalItem: Evaluation) => evalItem.evaluation_ID == event.target.value)
      })

      this.selectedEvalSem = evalItem[0]
      this.evalScoreCategory = this.evaluationService.setEvalScoreCategory(this.selectedEvalSem)

    } else {
      this.evalScoreCategory = this.evaluationService.setEvalScoreCategory(this.selectedEvalSem)
    }

  }

  sortByEvaluationYear(evals : Evaluation[]) {

    const evalsCopy = [...evals]
    return evalsCopy.sort((a, b) => {
        return a.evaluation_year - b.evaluation_year;
    });
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

  colorScheme = {
    name: 'myScheme',
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

  generateEvalReport() {
    if(this.evalReport.length <= 0) return

    this.excelService.exportExcel<object>(this.evalReport, `Evalution Report ${this.college}`, this.college, this.currSem)

  }
}
