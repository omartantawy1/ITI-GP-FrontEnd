import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from '../services/sign-in.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  submitted = false;
  errormsg: any = '';
  res: any = '';

  constructor(private fb: FormBuilder, private router: Router, private SignInService: SignInService, private tokenservice: TokenService) {}

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.signInForm.valid) {
      this.SignInService.verifyUser(this.signInForm.value).subscribe(

        (response: any) => {
            console.log('User logged in successfully', response);
            // localStorage.setItem('token', response.token);
            this.tokenservice.setToken(response.token);
            this.router.navigate(['workspace']);
        },
        (error) => {
          // Registration failed, handle the error here
          this.errormsg = error.error.message;
          console.error(this.errormsg);
        }
        );
      // You can add your sign-in logic here, e.g., authenticate the user.
      // After successful sign-in, navigate to the appropriate page.
    } else {
      console.log('Form is invalid. Not navigating...');
    }
  }
}
