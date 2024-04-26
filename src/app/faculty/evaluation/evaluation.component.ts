import { Component, Inject, OnInit, Renderer2, ElementRef, SimpleChanges } from '@angular/core';
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
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { selectAllEvaluation } from '../../state/faculty-state/faculty-state.selector';
import { Store, select } from '@ngrx/store';
import { loadEval } from '../../state/faculty-state/faculty-state.actions';

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
    //Proceed to next semester or year
    if (this.data.sem == 1) {
      this.evalForm.patchValue({
        semester: '2',
        evaluation_year: (this.data.year) + ''
      });
    }
    else {
      this.evalForm.patchValue({
        semester: '1',
        evaluation_year: ((+this.data.year) + 1) + ""
      })
    }

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
  imports: [NgxChartsModule, CommonModule, NgFor, LoadingScreenComponent],
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.css'
})
export class EvaluationComponent{

  isLoading: boolean = true;
  evaluation$ = this.store.select(selectAllEvaluation);
  evalScoreCategory!: ScoreCategory[]
  selectedEvalSem!: Evaluation
  evalHistory: evalScoreHistory[] = []
  evalBar!: HTMLElement
  
  constructor(
    private evaluationService: EvaluationService,
    public dialog: MatDialog,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private store: Store) { 
      this.evaluation$.subscribe({
        next: value => {
          this.evalHistory = this.evaluationService.setEvalHistory(value)
          this.selectedEvalSem = value[value.length - 1]
          this.selectEvalSem()
          this.isLoading = false
        },
      })
    }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("This is running!");
  }

  formToggle: boolean = false;
  // this.store.select(selectAllEvaluation);
  
  openDialog() {
    let yearVal: any;
    let semVal: any;
    this.evaluation$.subscribe({
      next: value => {
        yearVal = value[value.length-1].evaluation_year
        semVal = value[value.length-1].semester
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
  selectEvalSem(id?: number): void {
    if (id) {
      let evalItem!: Evaluation[]

      this.evaluation$.subscribe({
        next: value => evalItem = value.filter((evalItem: Evaluation) => evalItem.evaluation_ID == id)
      })
      
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
}
