import { Injectable } from '@angular/core';
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
  messages: Message[] = [];
  constructor() { }

  sendMessage(message: string, status: number) {
    console.log(message)
    this.messages.push({
      message, status
    })
  }

  // sendMessage(message: string, status: number): void  {
  //   this.messages.update(value => [...value, {'message': message, 'status': status}])
  //   console.log(this.messages().length)
  // }

  get getMessage(): Message[] {
    return this.messages
  }

  clearMessage = () => {
    this.messages = []
  }

  deleteMessage = (idx?: number) => {

    if (idx) {
      this.messages.splice(idx, 1)
      return
    }
    this.messages.shift()
  }
}
