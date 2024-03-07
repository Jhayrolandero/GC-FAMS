import { Component, Input, OnInit } from '@angular/core';
import { FacultymembersService } from '../../../../services/admin/facultymembers.service';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Schedule } from '../../../../services/admin/schedule';
import { DateSelectComponent } from '../../date-select/date-select.component';
import { NgOptimizedImage } from '@angular/common';
import { FacultyMember } from '../../../../services/admin/facultymembers';
import { ScheduleSectionComponent } from '../../schedule-section/schedule-section.component';

@Component({
  selector: 'app-faculty-box',
  standalone: true,
  imports: [NgFor, NgClass, DateSelectComponent, NgOptimizedImage, NgIf, ScheduleSectionComponent],
  providers: [FacultymembersService],
  templateUrl: './faculty-box.component.html',
  styleUrl: './faculty-box.component.css'
})
export class FacultyBoxComponent{

  constructor(private facultyService: FacultymembersService) {}

  isVisible: boolean = false;
  day: string = 'day=Monday';
  schedules: Schedule[] = [];

  setDay(day: string) {
    this.day = day;
    this.getSchedule();
  }

  @Input('member') member: FacultyMember = {
    id:0, name: '', units: 0, status: '', employment: '', isVisible: false, profileIMG: ''
  };

  getSchedule(): void {
    let params = this.day.concat(`&facultyID=${this.member.id}`);

      this.facultyService.getFacultySchedules(params).subscribe(
        schedules => this.schedules = schedules
      )
  }

  toggle():void {
    this.member.isVisible = !this.member.isVisible;

    if(this.member.isVisible) {
      this.getSchedule();
    }
  }
}
