import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Schedule } from '../../../services/admin/schedule';

@Component({
  selector: 'app-schedule-section',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './schedule-section.component.html',
  styleUrl: './schedule-section.component.css'
})
export class ScheduleSectionComponent {

  @Input('schedules') schedules: Schedule[] = [];
}
