import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ScheduleFacultyFetcherService } from '../../../../services/faculty/schedule-faculty-fetcher.service';
import { schedule } from '../../../../services/admin/schedule';
import { Router } from '@angular/router';
import { error } from 'node:console';


@Component({
  selector: 'app-schedule-block',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './schedule-block.component.html',
  styleUrl: './schedule-block.component.css'
})
export class ScheduleBlockComponent {
  @Input() week: number = new Date().getDate();
  schedules: schedule[] = [];
  filteredSchedule: schedule[] = [];
  weeks: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  constructor(private schedule:ScheduleFacultyFetcherService, private router:Router){
    this.getSchedule();
  }

  ngOnChanges(changes: SimpleChanges){
    this.filteredSchedule = [];
    this.filterSchedule();
  }
  
  getSchedule(){
    //Fetches the schedule data based on passed selected date
    this.schedule.fetchSchedDay().subscribe((next: schedule[]) => {
      console.log(next);
      this.schedules = next;
    }, (error) => {
      if(error.status == 403){
        this.router.navigate(['/']);
      };
    });
  }

  filterSchedule(){
    for(let i = 0; i < this.schedules.length; i++){
      if(this.schedules[i].week == this.week){
        this.filteredSchedule.push(this.schedules[i]);
      }
    }
    console.log(this.filteredSchedule);
  }


  tConvert (time: any) {
    // Check correct time format and split into components
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { // If time format correct
      time = time.slice (1);  // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    let temp = time.join(''); // return adjusted time or original string
    return temp.slice(0, -5) + temp.slice(-2);
  }
}