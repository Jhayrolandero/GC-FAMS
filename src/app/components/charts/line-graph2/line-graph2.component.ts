import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Datasets } from '../../../services/Interfaces/dataset';
Chart.register(...registerables);

@Component({
  selector: 'app-line-graph2',
  standalone: true,
  imports: [],
  templateUrl: './line-graph2.component.html',
  styleUrl: './line-graph2.component.css'
})
export class LineGraphComponent2 {
  public chart!: Chart;
  public chartId: string = `doughnut-${Math.random().toString(36).substr(2, 9)}`;
  @ViewChild('lineGraphCanvas', {static: true}) private lineGraphCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() label: number[] = [];
  @Input() label2: number[] = [];
  @Input() label3: number[] = [];
  @Input() labels: string[] = [];
  @Input() showLegend?: boolean;
  @Input() legendLabel: string[] = [];
  @Input() xAxisLabel: string = ''
  @Input() yAxisLabel: string = ''

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
        datasets: [] as Datasets[]
      };


    if(this.label && this.label.length > 0) {
      const dataSet = {
        label: this.legendLabel[0],
        data: this.label,
        fill: true,
        tension: 0.3,
        borderColor: 'rgb(7, 66, 135)',
        backgroundColor: 'rgba(7, 66, 135, 0.2)',
        hoverOffset: 4
      }
      data.datasets = [...data.datasets, dataSet];
    }


    if(this.label2 && this.label2.length > 0) {
      console.log(this.label2)
      const dataSet = {
        label: this.legendLabel[1] ? this.legendLabel[1] : undefined,
        data: this.label2,
        fill: true,
        tension: 0.3,
        borderColor: 'rgb(30, 114, 66)',
        backgroundColor: 'rgba(30, 114, 66, 0.2)',
        hoverOffset: 4
      }

      data.datasets = [...data.datasets, dataSet];
    }

    if(this.label3 && this.label3.length > 0) {
      const dataSet = {
        label: this.legendLabel[2] ? this.legendLabel[2] : undefined,
        data: this.label3,
        fill: true,
        tension: 0.3,
        borderColor: 'rgb(255, 122, 0)',
        backgroundColor: 'rgba(255, 122, 0, 0.2)',
        hoverOffset: 4
      }

      data.datasets = [...data.datasets, dataSet];
    }
    // let data = {
    //   labels: this.labels,
    //   datasets: [
    //     {
    //     label: this.legendLabel[0],
    //     data: this.label,
    //     fill: true,
    //     tension: 0.3,
    //     borderColor: 'rgb(7, 66, 135)',
    //     backgroundColor: 'rgba(7, 66, 135, 0.2)',
    //     hoverOffset: 4
    //     },
    //     {
    //       label: this.legendLabel[1] ? this.legendLabel[1] : undefined,
    //       data: this.label2,
    //       fill: true,
    //       tension: 0.3,
    //       borderColor: 'rgb(30, 114, 66)',
    //       backgroundColor: 'rgba(30, 114, 66, 0.2)',
    //       hoverOffset: 4
    //     },
    //     {
    //       label: this.legendLabel[2] ? this.legendLabel[2] : undefined,
    //       data: this.label3,
    //       fill: true,
    //       tension: 0.3,
    //       borderColor: 'rgb(255, 122, 0)',
    //       backgroundColor: 'rgba(255, 122, 0, 0.2)',
    //       hoverOffset: 4
    //     }
    // ]
    // };

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
