import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {
  public chart: any;
  public chartId: string = `doughnut-${Math.random().toString(36).substr(2, 9)}`;
  @ViewChild('barGraphCanvas') private barGraphCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() data: number[] = [];
  @Input() data2: number[] = [];
  @Input() labels: string[] = [];
  @Input() showLegend?: boolean;
  @Input() legendLabel: string[] = [];
  @Input() axis: string = '';
  @Input() bgColor: string = '';
  @Input() bgColor2: string = ''

  ngAfterViewInit(){
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.chart){
      this.chart.destroy();
    }
    this.createChart();
  }

  createChart(){
    let data = {
      labels: this.labels,
      datasets: [
        {
        label: this.legendLabel[0],
        data: this.data,
        fill: true,
        tension: 0.3,
        backgroundColor: this.bgColor,
        borderRadius: 5,
        hoverOffset: 4
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
          fill: true,
          tension: 0.3,
          backgroundColor: this.bgColor,
          borderRadius: 5,
          hoverOffset: 4
          },
          {
            label: this.legendLabel[1],
            data: this.data2,
            fill: true,
            tension: 0.3,
            backgroundColor: this.bgColor2,
            borderRadius: 5,
            hoverOffset: 4
            }
      ]
      };
    }

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
            }
          }
      }
      });
    }

  }
}
