import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../Services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


  loginError: string = '';
  signInForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', Validators.required]
    });
  }

  hideShowPass(): void {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash';
    this.type = this.isText ? 'text' : 'password';
  }

  signIn(): void {
    if (this.signInForm.valid) {
      const signInData = {
        userEmail: this.signInForm.value.userEmail,
        userPassword: this.signInForm.value.userPassword
      };

      this.authService.signIn(signInData.userEmail, signInData.userPassword)
        .subscribe({
          next: (response) => {
            this.signInForm.reset();
            if (response) {
              this.getUserInfo();
              const previousUrl = this.authService.getPreviousUrl();
              if (previousUrl) {
                this.router.navigateByUrl(previousUrl);
              } else {
                this.router.navigateByUrl('/homepage').then(() => {
                  window.location.reload();
                });
              }
            }
            else {
              this.loginError = 'Incorrect Email or Password! Try again';
            }
          },
          error: (error) => {
            console.error('Error occurred while signing in:', error);
            this.loginError = error;
          }
        });
    } else {
      this.loginError = 'Invalid info. Please check the fields.';
    }
  }

  getUserInfo(): void {
    this.authService.getUserInfo()
      .subscribe(
        userInfo => {
          this.authService.userInfo = userInfo;
        },
        error => {
          console.error('Error fetching user info:', error);
        }
      );
  }

}
