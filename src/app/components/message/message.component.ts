import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from './message-box/message-box.component';
@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, MessageBoxComponent],
  providers: [MessageService],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnChanges {
  @Input('show') isVisible = false;
  @Input('messages')  messages: {message: string, status: string}[] = []

  toggle() {
    this.isVisible = !this.isVisible
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log(changes)
  }

}
