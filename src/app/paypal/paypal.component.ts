import { Component } from '@angular/core';
import { PaypalService } from '../services/paypal.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserInterface } from '../interfaces/user-interface';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent {

  currentUser!:UserInterface;

  constructor(private paypalService: PaypalService, private router: Router, private userService: UserService){}

  ngOnInit(){
    this.userService.getCurrentUser().subscribe(
      (res: any) => this.currentUser = res
    );
  }

  // goToPaypal(){
  //   window.location.href = this.paypalService.getPayment();
  // }

  goToPaypal(){
    // this.paypalService.getPayment(this.currentUser).subscribe(
    //   (res: any) => {
    //     console.log(res);
    //     // window.location.href = res.url;
    //   },
    //   (err) => {
    //     console.log(err);
    //     window.location.href = `${err.url}/payment`;
    //   }
    // );
    window.location.href = `http://127.0.0.1:8000/api/paypal/payment`;
  }
}
