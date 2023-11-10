import { Component } from '@angular/core';
import { SignOutService } from '../services/sign-out.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-account-button',
  templateUrl: './account-button.component.html',
  styleUrls: ['./account-button.component.css']
})
export class AccountButtonComponent {

  isAccountListVisible = true; 
  currentUser: any = {};

  constructor(private SignOutService: SignOutService, private router: Router, private token: TokenService, private location: Location, private userService: UserService) {}

  ngOnInit(){
    this.userService.getCurrentUser().subscribe(
      res => this.currentUser = res,
      err => console.log(err)
    );
  }

  toggleAccountList() {
    this.isAccountListVisible = !this.isAccountListVisible;
  }

  logout() {

    this.SignOutService.logout().subscribe(
      (response) => {
        console.log('User logged out successfully', response);
        this.token.clearToken();
        this.location.replaceState('/'); 
        // You can clear the token or perform other user-related cleanup here

        this.router.navigate(['/sign-in']);
      },
      (error) => {
        console.error('Logout failed', error);
      }
    );
  }
}
