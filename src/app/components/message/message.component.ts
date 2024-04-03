import { Component, ElementRef, Input, OnChanges, OnInit, Signal, SimpleChanges, ViewChild, computed } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from './message-box/message-box.component';
import { Message } from '../../services/Interfaces/message';
@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, MessageBoxComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit {
  constructor(public messageService: MessageService) { }

  messages: Message[] = [];

  ngOnInit(): void {
    this.messages = this.messageService.getMessage
  }

  deleteMessage(idx: number) {
    this.messageService.deleteMessage(idx)
  }
}
