import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FacultymembersService } from '../../services/admin/facultymembers.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  providers:[FacultymembersService],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit {

  @Output() params = new EventEmitter<string>();

  firstPage: number = 1
  lastPage: number = 1;
  currPage: number = 1;
  pages: number[] = [];
  constructor(private facultyService: FacultymembersService) {}

  ngOnInit(): void {
    // this.getPagination()
  }

  getPagination(): void {
    this.facultyService.getPagination()
    .subscribe(
      (page: any) => {
        this.firstPage = page.first;
        this.lastPage = page.last
        for(let i = 1; i<=page.pages; i++) {
          this.pages.push(i);
        }
      }
    );
  }

  decrementPage(): void {
    this.currPage--;
    this.renderPage()
  }
  // '_page=1&_per_page=10'
  incrementPage(): void {
    this.currPage++;
    this.renderPage()
  }

  jumpPage(page: number): void {
    // console.log(page)
    this.currPage = page;
    this.renderPage()
  }

  renderPage(): void {
    this.params.emit(`_page=${this.currPage}&_per_page=10`)
  }
}
