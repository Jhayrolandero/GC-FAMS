import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';
import { CustomBGService } from '../../../services/custom-bg.service';
Chart.register(...registerables);

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {
  public chart!: Chart;
  public chartId: string = `doughnut-${Math.random().toString(36).substr(2, 9)}`;
  @ViewChild('barGraphCanvas', {static: true}) private barGraphCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() data: number[] = [];
  @Input() data2: number[] = [];
  @Input() labels: string[] = [];
  @Input() showLegend?: boolean;
  @Input() legendLabel: string[] = [];
  @Input() axis: string = '';
  @Input() bgColor: string = '';
  @Input() bgColor2: string = ''

  @Output() emitSemDiff = new EventEmitter<string>();

  constructor(private chartBGPlugin: CustomBGService) {}


  ngAfterViewInit(){
    this.chart.destroy();
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.chart){
      this.chart.destroy();
    }
    this.createChart();
  }

  createChart(){
    let data: ChartData<'bar'> = {
      labels: this.labels,
      datasets: [
        {
        label: this.legendLabel[0],
        data: this.data,
        backgroundColor: this.bgColor,
        borderRadius: 5,
        }
    ]
    };
    if(this.data2.length > 0){
      data = {
        labels: this.labels,
        datasets: [
          {
          label: this.legendLabel[0],
          data: this.data,
          backgroundColor: this.bgColor,
          borderRadius: 5,
          },
          {
            label: this.legendLabel[1],
            data: this.data2,
            backgroundColor: this.bgColor2,
            borderRadius: 5,
            }
      ]
      };
    }


    const customCanvasBackgroundColor = this.chartBGPlugin.customBG()

    const ctx = this.barGraphCanvas.nativeElement.getContext('2d');
    if(ctx){
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          indexAxis: this.axis as 'x' | 'y' | undefined,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          responsive: true, // This makes the chart responsive
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: this.showLegend,
              align: 'start'
            },
            customCanvasBackgroundColor: {
              color: 'white'
            }
          },

          animation: {
            onComplete: () => {
              this.emitSemDiff.emit(this.chart.toBase64Image('image/jpeg', 1));
            }
          },
      },
      plugins: [customCanvasBackgroundColor]
      } as ChartConfiguration<'bar'>);
    }

  }
}
