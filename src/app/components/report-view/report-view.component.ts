import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

interface TableValue {
  header: string[];
  value: string[][];
}

@Component({
  selector: 'app-report-view',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.css'
})
export class ReportViewComponent {

  @Input('data') data!: object[]
  tableValue!: TableValue

  ngOnChanges(changes: SimpleChanges): void {
    this.extractContent(this.data)
  }



  extractContent(items:object[]) {
    let data: TableValue = {
      header: [],
      value: []
    }

    data.header = [...Object.keys(items[0])]

    let numArr:string[][] = []

    items.map(item => {
      let a: string[] = []
      for (let [key, value] of Object.entries(item)) {
        a = [...a, value]
      }
      numArr = [...numArr, a]
    })

    data.value = [...numArr]

    this.tableValue = data
    // console.log(data)
  }

}
