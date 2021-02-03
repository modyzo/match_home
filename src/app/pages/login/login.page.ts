
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@app/services/data.service';
import { ToggleLoginComponent } from '@app/components/toggle-login/toggle-login.component';
import { environment } from '@env/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  showContent: any;
  data: any = [];
  constructor(public route: Router, public service: DataService) {
    this.showContent = true;
    this.data = environment.LOGIN_SLIDES_DATA;
  }
  ngOnInit() {
  }
  toggleContent() {
    // this.showContent = !this.showContent
    this.service.openModal(ToggleLoginComponent, '', 'modalBackground');
  }
  loginWithPhone() {
    this.route.navigate(['login-phone']);
  }
  gotAccountRecovery() {
    this.route.navigate(['account-recovery']);
  }
}
