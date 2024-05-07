import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { JwtToken } from '../../services/jwt-token';
import { mainPort } from '../../app.component';
import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  title: string = "GC-FaMS"
  subTitle: string = "Faculty Profiling and Development Monitoring System"
  privSwitch!: boolean;
  validForm = true;

  url = mainPort + '/GC-FaMS-API/API/login';
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  //Login form object
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private messageService: MessageService) {
    this.authService.flushToken();
  }

  onLogin(): void {
    this.authService.flushToken();
    this.messageService.sendMessage("Logging In", 0)
    this.validForm = true;
    
    //Main http post request, uses JwtToken interface, and stringified loginForm
    this.http.post<JwtToken>(this.url, this.loginForm.getRawValue()).subscribe({
      next: (res: any) => {
        //Success, wrong loginparams, and query error issue.
        if (res.code == 200) {
          let expireDate = new Date();
          expireDate.setTime(expireDate.getTime() + (10 * 60 * 1000));


          document.cookie = `token=${res.token}; ${expireDate}; path=/`
          console.log("Created token: " + res.privilege);

          res.privilege == 0 ? this.router.navigate(['/faculty']) : this.router.navigate(['/admin']);

          this.messageService.sendMessage("Welcome Back!", 1)
        } else if (res.code == 403) {
          console.log("Invalid parameters: ");
          console.log(res);
          this.validForm = false;
        } else if (res.code == 404) {
          console.log("Invalid query: ")
          console.log(res);
          this.validForm = false;
        }
      },
      error: (err) => {
        this.messageService.sendMessage("An unexpected Error has occurred!", -1)
        console.log(err)
      }
    })
  }

  showPass() {
    var pass = document.getElementById("password");
  }
}
