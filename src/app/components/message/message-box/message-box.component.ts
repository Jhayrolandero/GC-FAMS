import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.css'
})
export class MessageBoxComponent implements OnInit {

  @Input('message')  message: {message: string, status: string} = {message: '', status: ''}
  @Input('id') idx: number = -1
  private timer: any;
  ngOnInit() {
      this.timer = setTimeout(() => {
        this.deleteMessage();
      }, 3400);
  }

  deleteMessage() {
    clearTimeout(this.timer);
    var element = document.getElementById('message-'+this.idx);

    var op:any = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element!.style.display = 'none';
          }
          element!.style.opacity = op;
          element!.style.filter = 'alpha(opacity=' + op * 100 + ")";
          op -= op * 0.1;
        }, 10);
      }
}
