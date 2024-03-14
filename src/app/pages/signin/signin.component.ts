import { Router } from '@angular/router';
import { AuthService } from './../../core/service/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  errorMessage: string = '';
  isLoading: boolean = false;
  isloading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{5,15}$/),
    ]),
  });

  handleForm(): void {
    this.isLoading = true;
    this.isloading = true;
    console.log(this.loginForm); //^ just for test

    this._AuthService.signin(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response); //^ just for test

        if (response.msg === 'done') {
          // this.isLoading = false;
          localStorage.setItem(
            'userToken',
            `
          3b8ny__${response.token}`
          );

          this._AuthService.setUserToken();
          this._Router.navigate(['/notes']);
          this.isloading = false;
        }
      },
      error: (error) => {
        console.log(error); //^ just for test
        this.isLoading = false;
        this.errorMessage = error.error.msg;
        this.isloading = false;
      },
    });
  }
}
