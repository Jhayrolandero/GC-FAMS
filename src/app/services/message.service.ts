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
