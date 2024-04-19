import { Component, Input, OnDestroy, OnInit, input } from '@angular/core';
import { Attendee } from '../../services/Interfaces/attendee';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css'
})
export class TooltipComponent {
  @Input('attendees') attendees: Attendee[] = []
  @Input('isVisible') isVisible: boolean = false
  @Input('id') id: number = -1
  @Input('activeID') activeID: number | null = null
  // @Input('isLoading') isLoading: boolean = true


  get shouldShowTooltip() {
    return this.isVisible && this.activeID && this.id === this.activeID;
  }

}
