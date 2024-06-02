import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mainPort } from '../../app.component';
import { AuthService } from '../../services/auth.service';
import { JwtToken } from '../../services/jwt-token';
import { MessageService } from '../../services/message.service';
import { CryptoJSService } from '../../services/crypto-js.service';
import { Store } from '@ngrx/store';
import { logOut } from '../../state/logout.action';
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
  isAdmin: boolean = true
  isLoggin: boolean =  false
  role!: 'faculty' | 'admin'

  // url = mainPort + '/GC-FaMS-API/API/test';
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

  constructor(
    private store: Store,
    private messageService: MessageService,
    private cryptoJS: CryptoJSService,
    private route: ActivatedRoute
  ) {
    this.authService.flushToken();

  }


  ngOnInit() {
    this.role = this.route.snapshot.data['role'];
  }

  onLogin(): void {
    this.isLoggin = true
    this.store.dispatch(logOut());
    this.authService.flushToken();
    this.messageService.sendMessage("Logging In", 0)
    this.validForm = true;
    //Main http post request, uses JwtToken interface, and stringified loginForm
    this.http.post<JwtToken>(
      this.url,
      this.cryptoJS.CryptoJSAesEncrypt("ucj7XoyBfAMt/ZMF20SQ7sEzad+bKf4bha7bFBdl2HY=", JSON.stringify(this.loginForm.getRawValue()))).subscribe({
        next: (res: any) => {
          //Success, wrong loginparams, and query error issue.
          if (res.code == 200) {
            let expireDate = new Date();
            expireDate.setTime(expireDate.getTime() + (10 * 60 * 1000));
            document.cookie = `token=${res.token}; ${expireDate}; path=/`
            console.log("Created token: " + res.privilege);


            switch(this.role) {
              case 'admin':
                if(res.privilege != 1) {
                  console.log("Access not granted");
                  this.isAdmin = false
                  break
                }
                this.router.navigate(['/admin/manage-faculty'])
                this.messageService.sendMessage("Welcome Back!", 1)
                break
              case 'faculty':
                this.router.navigate(['/faculty/curriculum-vitae'])
                this.messageService.sendMessage("Welcome Back!", 1)
                break
              default:
                this.messageService.sendMessage("Error Something", -1)
                break;
            }
            // res.privilege == 0 ? this.router.navigate(['/faculty/curriculum-vitae']) : this.router.navigate(['/admin']);


          } else if (res.code == 403) {
            console.log("Invalid parameters: ");
            this.validForm = false;
          } else if (res.code == 404) {
            console.log("Invalid query: ")
            this.validForm = false;
          }
          this.isLoggin = false
        },
        error: (err) => {
          this.messageService.sendMessage("An unexpected Error has occurred!", -1)
          this.isLoggin = false
        }
      })
  }

  showPass() {
    var pass = document.getElementById("password");
  }
}
