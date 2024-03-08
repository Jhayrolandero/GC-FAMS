import { Component } from '@angular/core';
import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  providers: [MessageService],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {

}
