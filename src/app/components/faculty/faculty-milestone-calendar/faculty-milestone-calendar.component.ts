import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EducationalAttainment } from '../../../services/Interfaces/educational-attainment';
import { Certifications } from '../../../services/Interfaces/certifications';
import { IndustryExperience } from '../../../services/Interfaces/industry-experience';
import { Project } from '../../../services/Interfaces/project';
import { Expertise } from '../../../services/Interfaces/expertise';
import { CommunityExtension } from '../../../services/Interfaces/community-extension';
import { FacultyRequestService } from '../../../services/faculty/faculty-request.service';
import { forkJoin, map } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectAllCollegeEduc, selectAllExistCerts, selectCollegeCommex } from '../../../state/dean-state/dean-state.selector';
import { getCollegeCommex } from '../../../state/commex/commex.action';
import { parsedCollegeCommexSelector } from '../../../state/commex/commex.selector';
import { selectAllEduc, selectCommex, selectFacultyCerts } from '../../../state/faculty-state/faculty-state.selector';

//Event object to display on hover
interface Event {
  eventType: string;
  eventName: string;
  eventPlace?: string;
}

@Component({
  selector: 'app-faculty-milestone-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-milestone-calendar.component.html',
  styleUrl: './faculty-milestone-calendar.component.css'
})


export class FacultyMilestoneCalendarComponent implements OnInit{
  @Input() type: string = '';
  educAttainment!: EducationalAttainment[];
  certifications!: Certifications[];
  industryExp!: IndustryExperience[];
  projects!: Project[];
  commex!: CommunityExtension[];

  daysOfYear: (Date | any)[][] = [];
  startDate = new Date(2024, 0, 1)
  endDate = new Date(2024, 11, 31);
  delay = true;
  showCard = false;
  currentDate = new Date(this.startDate);
  commexCollegeStore: any;


  ngOnInit(): void {
    if(this.type === 'faculty'){
      this.store.select(selectAllEduc).subscribe(data => {
        data.forEach(educ => 
          this.addEvent(new Date(educ.year_end), this.eventParser("Educational Attainment", educ.educ_title, educ.educ_school)))
      });

      this.store.select(selectCommex).subscribe(data => {
        data.forEach(commex =>
          this.addEvent(new Date(commex.commex_date), this.eventParser("Community Extension", commex.commex_title, "")))
      });

      this.store.select(selectFacultyCerts).subscribe(data => {
        data.forEach(certs =>
          this.addEvent(new Date(certs.accomplished_date), this.eventParser("Certifications", certs.cert_name, certs.cert_corporation))
        )
      });
    }
    else{
      //Admin loading for calendar. opens a subscription for each observable and places each of their dates and data into the calendar.
      this.store.select(selectAllCollegeEduc).subscribe(data => {
        data.forEach(educ => 
          this.addEvent(new Date(educ.year_end), this.eventParser("Educational Attainment", educ.educ_title, educ.educ_school)))
      });

      this.store.select(selectCollegeCommex).subscribe(data => {
        data.forEach(commex =>
          this.addEvent(new Date(commex.commex_date), this.eventParser("Community Extension", commex.commex_title, "")))
      });

      this.store.select(selectAllExistCerts).subscribe(data => {
        data.forEach(certs =>
          this.addEvent(new Date(certs.accomplished_date), this.eventParser("Certifications", certs.cert_name, certs.cert_corporation))
        )
      });
    }
  }

  //Creates a 52-week formatted calendar of all dates in the current year.
  constructor(
    private facultyService: FacultyRequestService,
    public store: Store) {
    this.calendarBuild();
    // this.getMilestones();
  }

  eventParser(type: string, name: string, place: string) {
    const temp = {} as Event;

    temp.eventType = type;
    temp.eventName = name;
    temp.eventPlace = place;

    return temp;
  }

  //Add given event to calendar
  addEvent(givenDate: Date, eventData: Event) {
    let wIdx = 0;

    this.daysOfYear.forEach((week) => {
      let dIdx = 0;
      week.forEach((day) => {
        const dayG = new Date(givenDate).toLocaleDateString("en-US");
        const dayN = new Date(day).toLocaleDateString("en-US");
        if (dayG == dayN) {
          this.daysOfYear[wIdx][dIdx][1] = eventData;
          return;
        }
        dIdx++;
      })
      wIdx++;
    })
  }

  //Builds calendar
  calendarBuild() {
    //Iterates through each week
    while (this.currentDate <= this.endDate) {
      const week: (Date | any)[] = [];

      //Iterates through 7 days of current week
      for (let i = 0; i < 7; i++) {
        //Initial gate so each week always has first sunday
        if (this.delay == true && this.currentDate.getDay() != i) {
          week.push([new Date(""), ""]);
          continue;
        }
        else {
          this.delay = false;
        }

        //Push current week array to 2d array
        week.push([new Date(this.currentDate), ""]);

        //Replace current date to first day of next week (while loop now iterates each wek)
        this.currentDate.setDate(this.currentDate.getDate() + 1);
      }
      this.daysOfYear.push(week);
    }
  }
}
