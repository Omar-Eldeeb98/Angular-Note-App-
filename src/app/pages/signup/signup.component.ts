import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  errorMessage: string = '';
  isLoading: boolean = false;
  isloading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{5,15}$/),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    age: new FormControl('', [Validators.required]),
  });

  handleForm(): void {
    // console.log(this.registerForm);
    this.isLoading = true;
    this.isloading = true;
    this._AuthService.signUp(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response); //^ just for testing
        if (response.msg === 'done') {
          // this.isLoading = false;
          this._Router.navigate(['/signin']);
          this.isloading = false;
        }
      },
      error: (error) => {
        console.log(error); //^ just for testing
        this.isLoading = false;
        this.errorMessage = error.error.msg;
        this.isloading = false;
      },
    });
  }
}
