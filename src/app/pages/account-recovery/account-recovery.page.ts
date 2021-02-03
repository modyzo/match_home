/** */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-recovery',
  templateUrl: './account-recovery.page.html',
  styleUrls: ['./account-recovery.page.scss'],
})
export class AccountRecoveryPage implements OnInit {

  constructor(public route: Router) { }

  ngOnInit() {
  }
  loginWithEmail() {
    this.route.navigate(['login-email']);
  }
}
