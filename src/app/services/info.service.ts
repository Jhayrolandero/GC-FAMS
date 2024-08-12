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

  date = new Date();

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

  currAY = this.getSemester(new Date().getMonth()+'', new Date().getFullYear())

  getSemester(month: string, year: number) {
    // Define month names and their corresponding semester periods
    const months: { [key: string]: { semester: number, yearOffset: number } } = {
      "0": { semester: 2, yearOffset: 0 },
      "1": { semester: 2, yearOffset: 0 },
      "2": { semester: 2, yearOffset: 0 },
      "3": { semester: 2, yearOffset: 0 },
      "4": { semester: 2, yearOffset: 0 },
      "5": { semester: 2, yearOffset: 0 },
      "6": { semester: 3, yearOffset: 0 },
      "7": { semester: 1, yearOffset: 0 },
      "8": { semester: 1, yearOffset: 0 },
      "9": { semester: 1, yearOffset: 0 },
      "10": { semester: 1, yearOffset: 0 },
      "11": { semester: 1, yearOffset: 0 },
    };

    // Check if the provided month is valid
    if (!months.hasOwnProperty(month)) {
      throw new Error("Invalid month");
    }

    const { semester, yearOffset } = months[month];

    // Determine academic year
    let academicYearStart, academicYearEnd;
    if (semester == 1) {
      academicYearStart = year;
      academicYearEnd = year + 1;
    } else if (semester == 2) {
      academicYearStart = year - 1;
      academicYearEnd = year;
    } else if (semester == 3) {
      academicYearStart = year;
      academicYearEnd = year;
    } else {
      throw new Error("Month provided does not belong to any semester.");
    }

    return {
      semester: semester,
      academicYearStart,
      academicYearEnd
    };
  }


  calculateAge(birthDate: any) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    const dayDifference = today.getDate() - birth.getDate();

    // If the birthdate hasn't occurred yet this year, subtract one from the age
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }
    return age;
  }

}
