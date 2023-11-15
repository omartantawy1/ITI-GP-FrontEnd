import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from '../services/sign-up.service';
import { TokenService } from '../services/token.service';
import { NavbarWithAccountService } from '../services/navbar-with-account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  signupForm!: FormGroup; // Add '!' to indicate it will be initialized later
  submitted = false;
  errorarr: any = '';

  constructor(private navbarService:NavbarWithAccountService,private fb: FormBuilder, private router: Router, private SignUpService: SignUpService, private tokenservice: TokenService) {}

  

  ngOnInit() {
    this.navbarService.hide();
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.pattern(/\w+/), Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator
    });
  }
  
  ngOnDestroy(){
    this.navbarService.display();
  }

  // Custom password match validator
  passwordMatchValidator(group: AbstractControl) {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');
  
    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }
  
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPasswordControl.setErrors(null);
      return null;
    }
  }

  clearApiError(){
    this.errorarr = '';
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.valid) {
      this.SignUpService.createUser(this.signupForm.value).subscribe(

      (response: any) => {
          console.log('User registered successfully', response);
          this.tokenservice.setToken(response.token);
          this.router.navigate(['workspace']);
      },
      (error) => {
        // Registration failed, handle the error here
        this.errorarr = error.error.errors;
        console.error(this.errorarr.email[0]);
      }
      );
      // this.router.navigate(["sign-in"]);
    } else {
      console.log('Form is invalid. Not navigating...', this.signupForm);
    }
  }
}