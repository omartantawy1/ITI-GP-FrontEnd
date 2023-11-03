import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpService } from '../services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  signupForm!: FormGroup; // Add '!' to indicate it will be initialized later
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router, private SignUpService: SignUpService) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.pattern(/^[^\s]{4,}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator
    });
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

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.valid) {
      this.SignUpService.createUser(this.signupForm.value).subscribe(

      (response) => {
          console.log('User registered successfully', response);
          this.router.navigate(['sign-in']);
      },
      (error) => {
        // Registration failed, handle the error here
        console.error(this.signupForm, error.error.errors);
        const errorarr = error.error.errors;
      }
      );
      // this.router.navigate(["sign-in"]);
    } else {
      console.log('Form is invalid. Not navigating...', this.signupForm);
    }
  }
}