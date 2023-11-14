import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from '../services/reset-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {


  resetPasswordForm!: FormGroup;
  submitted = false;
  errormsg: any = '';
  res: any = '';

  constructor(private fb: FormBuilder, private resetPasswordService: ResetPasswordService, private router: Router) {}

  ngOnInit(){
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      token: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: AbstractControl) {
    const passwordControl = group.get('password');
    const passwordConfirmationControl = group.get('password_confirmation');
  
    if (!passwordControl || !passwordConfirmationControl) {
      return null;
    }
  
    if (passwordControl.value !== passwordConfirmationControl.value) {
      passwordConfirmationControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      passwordConfirmationControl.setErrors(null);
      return null;
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.resetPasswordForm.valid) {
      this.resetPasswordService.postResetPassword(this.resetPasswordForm.value).subscribe(

        (response: any) => {
          this.errormsg = '';
          this.res = '';
          this.res = response.message;
          this.openModal();
            console.log(response);
        },
        (error) => {
          this.res = '';
          this.errormsg = '';
          if(error.error.errors){
            this.errormsg = error.error.errors;
          }
          else{
            this.errormsg = error.error;
          }
          console.error(error);
        }
        );
      // You can add your sign-in logic here, e.g., authenticate the user.
      // After successful sign-in, navigate to the appropriate page.
    } else {
      console.log('invalid');
    }
  }

  clearApiEmailError(){
    this.errormsg = '';
  }

  openModal() {
    const button = document.getElementById('modL');
    if (button) {
      button.click();
    }
  }

  redirectToSignIn(){
    this.router.navigate(['sign-in']);
  }
}
