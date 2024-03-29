import { Component, ElementRef, Input, OnChanges, OnInit, Signal, SimpleChanges, ViewChild, computed } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from './message-box/message-box.component';
import { Message } from '../../services/Interfaces/message';
@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, MessageBoxComponent],
  providers: [MessageService],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnChanges{

  @ViewChild("message_box") target1ref!: ElementRef; // gets #target1
  visible = true;
  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['message'].firstChange) {
      this.visible = true
      console.log(this.target1ref)
    }

    // setInterval(() => {
    //   this.target1ref += "Hello"
    // }, 1000);
  }

  /*
  -1  - Error
  0   - Pending
  1   - Success
  */

  @Input('message') message?: Message
}
