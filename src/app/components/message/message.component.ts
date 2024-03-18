import { Component, Input, OnChanges, OnInit, Signal, SimpleChanges, computed } from '@angular/core';
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
export class MessageComponent {

  showComponents: boolean = false
  constructor(public messageService: MessageService) {}
}
