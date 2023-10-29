import { Component } from '@angular/core';

@Component({
  selector: 'app-account-button',
  templateUrl: './account-button.component.html',
  styleUrls: ['./account-button.component.css']
})
export class AccountButtonComponent {

  isAccountListVisible = true; 

  toggleAccountList() {
    this.isAccountListVisible = !this.isAccountListVisible;
  }
}
