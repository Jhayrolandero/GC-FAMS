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
import { selectAllEvaluation, selectEvalData, selectEvaluationReport, selectPRofileCollege, selectSortedEvals } from '../../state/faculty-state/faculty-state.selector';
import { Store, select } from '@ngrx/store';
import { loadEval } from '../../state/faculty-state/faculty-state.actions';
import { EmptyTitleComponent } from '../../components/empty-title/empty-title.component';
import { Subscription, filter, take } from 'rxjs';
import { ExcelServiceService } from '../../service/excel-service.service';
import { ReportViewComponent } from '../../components/report-view/report-view.component';
import { LineGraphComponent2 } from "../../components/charts/line-graph2/line-graph2.component";
import { InfoService } from '../../services/info.service';

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
    FormsModule,
    ReportViewComponent
  ],
})

export class EvaluationForm {
  [x: string]: any;
  constructor(
    public facultyRequest: FacultyRequestService,
    public dialogRef: MatDialogRef<EvaluationForm>,
    private info: InfoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  evalForm = new FormGroup({
    semester: new FormControl(this.info.currAY.semester),
    evaluation_year: new FormControl(this.info.currAY.academicYearStart),
    evaluation_year_end: new FormControl(this.info.currAY.academicYearEnd),
    param1_score: new FormControl('', [Validators.max(5), Validators.min(0)]),
    param2_score: new FormControl('', [Validators.max(5), Validators.min(0)]),
    param3_score: new FormControl('', [Validators.max(5), Validators.min(0)]),
    param4_score: new FormControl('', [Validators.max(5), Validators.min(0)]),
    param5_score: new FormControl('', [Validators.max(5), Validators.min(0)]),
    param6_score: new FormControl('', [Validators.max(5), Validators.min(0)]),
  })
  // evalForm = new FormGroup({
  //   semester: new FormControl(''),
  //   evaluation_year: new FormControl(''),
  //   evaluation_year_end: new FormControl(''),
  //   param1_score: new FormControl('', [Validators.max(5), Validators.min(0)]),
  //   param2_score: new FormControl('', [Validators.max(5), Validators.min(0)]),
  //   param3_score: new FormControl('', [Validators.max(5), Validators.min(0)]),
  //   param4_score: new FormControl('', [Validators.max(5), Validators.min(0)]),
  //   param5_score: new FormControl('', [Validators.max(5), Validators.min(0)]),
  //   param6_score: new FormControl('', [Validators.max(5), Validators.min(0)]),
  // })

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
    templateUrl: './evaluation.component.html',
    styleUrl: './evaluation.component.css',
    imports: [NgxChartsModule, CommonModule, NgFor, LoadingScreenComponent, EmptyTitleComponent, ReportViewComponent, LineGraphComponent2]
})
export class EvaluationComponent{

  isLoading: boolean = true;
  evaluation$ = this.store.select(selectAllEvaluation);
  sortedEvaluation$ = this.store.select(selectSortedEvals);
  evaluationData$ = this.store.select(selectEvalData);
  evalReportData$ = this.store.select(selectEvaluationReport)

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
    private info: InfoService,
    private store: Store) {
      this.sortedEvaluation$.subscribe({
        next: value => {
          this.evalHistory = this.evaluationService.setEvalHistory(value)
          this.selectedEvalSem = value[value.length - 1]
          this.selectEvalSem(undefined)
          this.isLoading = false
          // console.log(value)
        },
      })
    }

    currAY = this.info.currAY
    ngOnInit() {
      this.evalReportSubscription = this.store.pipe(
        select(selectEvaluationReport),
        filter(data => !!data),
        take(1)
      ).subscribe({
        next: res => {
          this.evalReport = res!
        }
      })
    }

  ngOnDestory() {
    this.evalReportSubscription.unsubscribe()
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

  generateEvalReport() {
    if(this.evalReport.length <= 0) return

    this.excelService.facultyEval(this.evalReport)
  }
}
