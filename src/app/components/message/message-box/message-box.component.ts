import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.css'
})
export class MessageBoxComponent implements OnInit {

  constructor(private messageService: MessageService) { }
  @Input("message") msg!: string
  @Input("status") status!: number

  ngOnInit(): void {
    setTimeout(() => {
      this.messageService.deleteMessage()
    }, 6000)
  }
}
