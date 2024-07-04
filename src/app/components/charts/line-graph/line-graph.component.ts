import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IndTimelineData } from '../../../services/Interfaces/indTimelineData';
Chart.register(...registerables);

@Component({
  selector: 'app-line-graph',
  standalone: true,
  imports: [],
  templateUrl: './line-graph.component.html',
  styleUrl: './line-graph.component.css'
})
export class LineGraphComponent {
  public chart!: Chart;
  public chartId: string = `doughnut-${Math.random().toString(36).substr(2, 9)}`;
  @ViewChild('lineGraphCanvas', {static: true}) private lineGraphCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() label: IndTimelineData | undefined;
  @Input() label2: IndTimelineData | undefined;
  @Input() label3: IndTimelineData | undefined;
  @Input() labels: string[] = [];
  @Input() showLegend?: boolean;
  @Input() legendLabel: string[] = [];
  @Input() yAxisLabel: string = ''
  @Input() xAxisLabel: string = ''


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
        label: this.label ? this.label.label : 'None',
        data: this.label ? this.label?.value :  [],
        // label: this.data ? this.legendLabel[0] : 'None',
        // data: this.data?.value,
        fill: true,
        tension: 0.3,
        borderColor: 'rgb(7, 66, 135)',
        backgroundColor: 'rgba(7, 66, 135, 0.2)',
        hoverOffset: 4
        },
        {
          label: this.label2 ? this.label2.label : 'None',
          data: this.label2 ? this.label2.value : [],
          // label: this.legendLabel[1],
          // data: this.data2,
          fill: true,
          tension: 0.3,
          borderColor: 'rgb(30, 114, 66)',
          backgroundColor: 'rgba(30, 114, 66, 0.2)',
          hoverOffset: 4
        },
        {
          label: this.label3 ? this.label3.label : 'None',
          data: this.label3 ? this.label3.value : [],
          // label: this.legendLabel[2],
          // data: this.data3,
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
              display: this.showLegend,
              align: 'start'
            }
          }
      }
      });
    }

  }
}
