import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from './components/message/message.component';
import { Store } from '@ngrx/store';
import { loadCert } from './state/certs/cert.actions';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GC-FaMS';

  constructor(private store: Store){}

  ngOnInit(){
    this.store.dispatch(loadCert());
    console.log("App Component initialized");
  }
}
//PARA ISAHANG CHANGE NALANG NG LOCALHOST SA LAHAT NG HTTP REQUESTS
export const mainPort = "http://localhost";


