import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, filter, firstValueFrom, take } from 'rxjs';
import { selectPRofileCollege } from '../state/faculty-state/faculty-state.selector';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  constructor(
    private store: Store
  ) { }

  collegeSubscription!: Subscription

  async getCollege() {
    const collegeObservable = this.store.pipe(
      select(selectPRofileCollege),
      filter(data => !!data),
      take(1)
    );

    const college = await firstValueFrom(collegeObservable);

    return college!;
  }
}
