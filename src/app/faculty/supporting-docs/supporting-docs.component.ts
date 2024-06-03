import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { EducationalAttainment } from '../../services/Interfaces/educational-attainment';
import { Store, select } from '@ngrx/store';
import { selectAnEduc } from '../../state/faculty-state/faculty-state.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supporting-docs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supporting-docs.component.html',
  styleUrl: './supporting-docs.component.css'
})
export class SupportingDocsComponent {


  sub!: Subscription
  id: number = 0
  title!: string

  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {}

  router = inject(Router);

  data!: EducationalAttainment

  educAttainmentSubscription!: Subscription

  ngOnInit() {

    console.log(this.router.url.split('/')[2])
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      switch(this.router.url.split('/')[2].toLowerCase()) {
        case 'cert':
          this.title = 'cert';
          break;
        case 'educ':
          this.subEduc(this.id)
        break;
        case 'industry':
          this.title = 'industry';
          break;
        case 'expertise':
          this.title = 'expertise';
          break;
      }
    });
  }


  ngOnDestroy() {
    this.educAttainmentSubscription.unsubscribe()
    this.sub.unsubscribe()
  }

  subEduc(id: number) {
    this.educAttainmentSubscription = this.store.pipe(
      select(selectAnEduc(id)),
      filter(data => !!data)
    ).subscribe({
      next: res => this.data = res!
    })
  }

  goBack() {
    this.router.navigate(['faculty/curriculum-vitae'])
  }

}

