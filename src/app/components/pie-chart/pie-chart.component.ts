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
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  explodeSlices: boolean = false;

  colorScheme = {name: 'myScheme',
  selectable: true,
  group: ScaleType.Ordinal,
    domain: ['#fbd650', '#65c280', '#1f7cb5', '#ef6540']
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
