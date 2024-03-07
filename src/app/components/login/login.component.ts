import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { JwtToken } from '../../services/jwt-token';

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

  url = 'http://localhost/GC-FaMS-API/API/login';
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  	//Login form object
	loginForm = new FormGroup({
		email: new FormControl(''),
		password: new FormControl('')
	})

	constructor(){}

	onLogin(): void{
		this.validForm = true;
		//Main http post request, uses JwtToken interface, and stringified loginForm
		this.http.post<JwtToken>(this.url, this.loginForm.getRawValue()).subscribe((response) => {
			console.log(response);
		//Success, wrong loginparams, and query error issue.
		if(response.code == 200){
			document.cookie = "token=" + response.token;
			//Router for faculty privilege
			if(response.privilege == 0){
			this.router.navigate(['/faculty']);
			}
			//Router for admin privilege
			else if(response.privilege == 1){
			this.router.navigate(['/admin']);
			}
		}
		else if(response.code == 403){
			console.log("Invalid parameters: ");
			console.log(response);
			this.validForm = false;
		}
		else if(response.code == 404){
			console.log("Invalid query: ")
			console.log(response);
			this.validForm = false;
		}
		})
	}

	showPass(){
		var pass = document.getElementById("password");

	}
}
