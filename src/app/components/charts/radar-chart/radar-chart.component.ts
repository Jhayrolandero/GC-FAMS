import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-radar-chart',
  standalone: true,
  imports: [],
  templateUrl: './radar-chart.component.html',
  styleUrl: './radar-chart.component.css'
})
export class RadarChartComponent {
  public chart: any;
  public chartId: string = `doughnut-${Math.random().toString(36).substr(2, 9)}`;
  @ViewChild('radarChartCanvas', {static: true}) private radarChartCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() data: number[] = [];
  @Input() data2: number[] = [];
  @Input() data3: number[] = [];
  @Input() labels: string[] = [];
  @Input() showLegend?: boolean;

  @Input() label1: any[] = [];
  @Input() label2: any[] = [];
  @Input() label3: any[] = [];
  ngAfterViewInit() {
    this.chart.destroy();
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.chart){
      this.chart.destroy();
    }

    this.createChart();
  }

  createChart() {
    const data = {
      labels: this.labels,
      datasets: [{
        label: this.label1 ? this.label1[0] : 'None',
        data: this.data,
        fill: true,
        backgroundColor: 'rgba(7, 66, 135, 0.2)',
        borderColor: 'rgb(7, 66, 135)',
        pointBackgroundColor: 'rgb(7, 66, 135)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: 'rgb(7, 66, 135)',
        pointHoverBorderColor: '#fff'
      },
      {
        label: this.label2 ? this.label2[0] : 'None',
        data: this.data2,
        fill: true,
        backgroundColor: 'rgba(255, 122, 0, 0.2)',
        borderColor: '#FF7A00',
        pointBackgroundColor: '#FF7A00',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#FF7A00'
      },
      {
        label: this.label3 ? this.label3[0] : 'None',
        data: this.data3,
        fill: true,
        backgroundColor: 'rgba(30, 114, 66, 0.2)',
        borderColor: '#1E7242',
        pointBackgroundColor: '#1E7242',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#1E7242'
      }]
    };

    const ctx = this.radarChartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
          responsive: true, // This makes the chart responsive
          plugins: {
            legend: {
              display: this.showLegend,
              position: 'bottom'
            }
          }
        }
      });
    }

  }
}
