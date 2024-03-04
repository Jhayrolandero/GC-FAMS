import { Component } from '@angular/core';
import {RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GC-FAMS';
}
//PARA ISAHANG CHANGE NALANG NG LOCALHOST SA LAHAT NG HTTP REQUESTS
export const mainPort =  "http://localhost:8080";