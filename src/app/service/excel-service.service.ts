import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelServiceService {

  constructor() { }
  title = 'angular-app';

  exportexcel<T>(data: T[], title: string ): void
  {

    console.log("generating")
    /* pass here the table id */
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(this.userList);
    const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, title + '.xlsx');

  }

}
