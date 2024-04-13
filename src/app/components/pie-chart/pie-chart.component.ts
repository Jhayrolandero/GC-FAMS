import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { single } from '../../faculty/analytics/data';
@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements OnInit {
  @Input('data') data: any[] = []
  single: any[] | undefined;
  view: any[] | undefined;

  // options
  arcWidth: number = 0.4;
  viewSize = [2,2];
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = false;
  isDoughnut: boolean = true;
  explodeSlices: boolean = false;

  colorScheme = {name: 'myScheme',
  selectable: true,
  group: ScaleType.Ordinal,
    domain: ['#074287', '#1E7242', '#FF7A00', '#ef6540']
  };

  constructor() {
  }
  ngOnInit(): void {
    this.single = this.data
  }

  labelFormatter(lb: string){
    return "h3h3" + lb;
  }

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
