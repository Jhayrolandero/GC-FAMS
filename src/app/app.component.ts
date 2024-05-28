import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from './components/message/message.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GC-FaMS';
}
//PARA ISAHANG CHANGE NALANG NG LOCALHOST SA LAHAT NG HTTP REQUESTS
export const mainPort = "http://localhost";
// export const mainPort = "https://gcfams.com/";
// export const mainPort = "https://gc-fams.000webhostapp.com";
export const key = "ucj7XoyBfAMt/ZMF20SQ7sEzad+bKf4bha7bFBdl2HY=";