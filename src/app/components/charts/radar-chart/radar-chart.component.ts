import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartOptions, Plugin } from 'chart.js';
import { CustomBGService } from '../../../services/custom-bg.service';
import { EvaluationRadar } from '../../../services/Interfaces/radarEvaluation';
import { ExcelServiceService } from '../../../service/excel-service.service';
import { RadarChartData } from '../../../services/Interfaces/radarChartData';



@Component({
  selector: 'app-radar-chart',
  standalone: true,
  imports: [],
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent {
  public chart!: Chart;
  public chartId: string = `doughnut-${Math.random().toString(36).substr(2, 9)}`;
  @ViewChild('radarChartCanvas', {static: true}) private radarChartCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() labels: string[] = [];
  @Input() showLegend?: boolean;

  @Input() label1: RadarChartData|undefined;
  @Input() label2: RadarChartData|undefined;
  @Input() label3: RadarChartData|undefined;

  radarData: EvaluationRadar[] = []

  @Output() emitRadar = new EventEmitter<string>();
  @Output() emitRadarData = new EventEmitter<EvaluationRadar[]>();

  constructor(
    private chartBGPlugin: CustomBGService,
    private excelService: ExcelServiceService
  ) {}

  ngAfterViewInit() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.chart.destroy();
    }

    if(this.radarData.length > 0) {
      this.radarData = []
    }
    this.createChart();
    this.emitRadarData.emit(this.radarData);
  }

  createChart() {
    const data: ChartData<'radar'> = {
      labels: this.labels,
      datasets: [
        {
          label: this.label1 ? this.label1.name : 'None',
          data: this.label1 ? this.label1.value : [],
          fill: true,
          backgroundColor: 'rgba(7, 66, 135, 0.2)',
          borderColor: 'rgb(7, 66, 135)',
          pointBackgroundColor: 'rgb(7, 66, 135)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: 'rgb(7, 66, 135)',
          pointHoverBorderColor: '#fff'
        },
        {
          label: this.label2 ? this.label2.name : 'None',
          data: this.label2 ? this.label2.value : [],
          fill: true,
          backgroundColor: 'rgba(255, 122, 0, 0.2)',
          borderColor: '#FF7A00',
          pointBackgroundColor: '#FF7A00',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#FF7A00'
        },
        {
          label: this.label3 ? this.label3.name : 'None',
          data: this.label3 ? this.label3.value : [],
          fill: true,
          backgroundColor: 'rgba(30, 114, 66, 0.2)',
          borderColor: '#1E7242',
          pointBackgroundColor: '#1E7242',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#1E7242'
        }
      ]
    };

    const customCanvasBackgroundColor = this.chartBGPlugin.customBG()

    const ctx = this.radarChartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Evaluation Radar Chart'
          },
            customCanvasBackgroundColor: {
              color: 'white'
            },
            legend: {
              display: this.showLegend,
              position: 'bottom'
            }
          },
          responsive: true
        },
        plugins: [customCanvasBackgroundColor]
      } as ChartConfiguration<'radar'>);
    }
  }
}
