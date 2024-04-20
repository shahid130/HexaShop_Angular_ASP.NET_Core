import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupError: string = '';
  signUpForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userNumber: ['', Validators.required],
      userAddress: ['', Validators.required],
      userPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  hideShowPass(): void {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.type = this.isText ? 'text' : 'password';
  }

  signUp(): void {
    if (this.signUpForm.valid) {
      const user = {
        userName: this.signUpForm.value.userName!,
        userEmail: this.signUpForm.value.userEmail!,
        userNumber: this.signUpForm.value.userAddress!,
        userAddress: this.signUpForm.value.userNumber!,
        userPassword: this.signUpForm.value.userPassword!,
      };
      this.authService.createUser(user).subscribe({
        next: () => {
          this.signUpForm.reset();
          this.router.navigate(['signin']);
        },
        error: (error) => {
          console.error('Error occurred while submitting form:', error);
          this.signupError = error;
        }
      });
    } else {
      this.signupError = 'Invalid info. Please check the fields.';
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
/*

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Iuser } from '../../Interfaces/User';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  FormBuilder = inject(FormBuilder);
  AuthenticationService = inject(AuthenticationService);

  public signUpForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userNumber: ['', Validators.required],
      userAdress: ['', Validators.required],
      userPassword: ['', Validators.required]
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.isText ? this.type = 'text' : this.type = 'password';
  }

  signUp(): void {
    if (this.signUpForm.valid) {
      console.log('Registration successful' + this.signUpForm.value);
      const user: Iuser={
        userName: this.signUpForm.value.userName!,
        userEmail: this.signUpForm.value.userEmail!,
        userNumber: this.signUpForm.value.userAdress!,
        userAdress: this.signUpForm.value.userNumber!,
        userPassword: this.signUpForm.value.userPassword!,
      };
      this.AuthenticationService.createUser(user).subscribe(() => {
        console.log("Success");

      });
      
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
*/
