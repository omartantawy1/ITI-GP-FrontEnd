import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgetPasswordService } from '../services/forget-password.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  forgetPasswordForm!: FormGroup;
  submitted = false;
  errormsg: any = '';
  res: any = '';

  constructor(private fb: FormBuilder, private forgetPasswordService: ForgetPasswordService, private router: Router) {}

  ngOnInit(){
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.forgetPasswordForm.valid) {
      this.forgetPasswordService.postForgetPassword(this.forgetPasswordForm.value).subscribe(

        (response: any) => {
          this.errormsg = '';
          this.res = '';
          this.res = response.message;
            console.log(response);
        },
        (error) => {
          this.res = '';
          this.errormsg = '';
          this.errormsg = error.error.message;
          console.error(this.errormsg, error);
        }
        );
      // You can add your sign-in logic here, e.g., authenticate the user.
      // After successful sign-in, navigate to the appropriate page.
    } else {
      console.log('invalid');
    }
  }

  clearApiError(){
    this.errormsg = '';
  }

  redirectToSignIn(){
    this.router.navigate(['sign-in']);
  }
}
