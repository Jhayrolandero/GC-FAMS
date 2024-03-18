import { Injectable, WritableSignal, signal } from '@angular/core';
import { Message } from './Interfaces/message';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  /*
  Status Meaning
  -1 = Error
  0 = Pending/Process
  1 = success
  */
  messages: WritableSignal<Message[]> = signal([])

  constructor() { }


  sendMessage(message: string, status: number): void  {
    this.messages.update(value => [...value, {'message': message, 'status': status}])
    console.log(this.messages().length)
  }

  get messageArr(): Message[] {
    return this.messages()
  }
}
