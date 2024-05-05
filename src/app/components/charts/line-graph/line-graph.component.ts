import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-line-graph',
  standalone: true,
  imports: [],
  templateUrl: './line-graph.component.html',
  styleUrl: './line-graph.component.css'
})
export class LineGraphComponent {
  public chart: any;
  public chartId: string = `doughnut-${Math.random().toString(36).substr(2, 9)}`;
  @ViewChild('lineGraphCanvas') private lineGraphCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() data: number[] = [];
  @Input() data2: number[] = [];
  @Input() data3: number[] = [];
  @Input() labels: string[] = [];


  ngAfterViewInit(){
    this.createChart();
  }

  createChart(){
    let data = {
      labels: this.labels,
      datasets: [
        {
        data: this.data,
        fill: true,
        tension: 0.3,
        borderColor: 'rgb(7, 66, 135)',
        backgroundColor: 'rgba(7, 66, 135, 0.2)',
        hoverOffset: 4
        },
        {
          data: this.data2,
          fill: true,
          tension: 0.3,
          borderColor: 'rgb(30, 114, 66)',
          backgroundColor: 'rgba(30, 114, 66, 0.2)',
          hoverOffset: 4
        },
        {
          data: this.data3,
          fill: true,
          tension: 0.3,
          borderColor: 'rgb(255, 122, 0)',
          backgroundColor: 'rgba(255, 122, 0, 0.2)',
          hoverOffset: 4
        }
    ]
    };

    const ctx = this.lineGraphCanvas.nativeElement.getContext('2d');
    if(ctx){
      this.chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          responsive: true, // This makes the chart responsive
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            }
          }
      }
      });
    }

  }
}
