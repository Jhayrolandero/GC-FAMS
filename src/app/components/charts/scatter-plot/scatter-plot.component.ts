import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-scatter-plot',
  standalone: true,
  imports: [],
  templateUrl: './scatter-plot.component.html',
  styleUrl: './scatter-plot.component.css'
})
export class ScatterPlotComponent {
  public chart: any;
  public chartId: string = `doughnut-${Math.random().toString(36).substr(2, 9)}`;
  @ViewChild('scatterGraphCanvas', {static: true}) private scatterGraphCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() data: number[][] = [[]];
  @Input() labels: string[] = [];
  @Input() showLegend?: boolean;
  @Input() legendLabel: string[] = [];
  @Input() axis: string = '';
  @Input() bgColor: string = '';

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

    const ctx = this.scatterGraphCanvas.nativeElement.getContext('2d');
    if(ctx){
      this.chart = new Chart(ctx, {
        type: 'scatter',
        data: data,
        options: {
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

