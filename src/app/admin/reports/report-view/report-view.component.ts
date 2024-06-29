import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-view',
  standalone: true,
  imports: [],
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.css'
})
export class ReportViewComponent {

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.title = params['id']
    })
  }

  title: string = ""
}
