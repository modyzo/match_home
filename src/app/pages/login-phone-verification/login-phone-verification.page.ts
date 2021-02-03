/** */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-login-phone-verification',
  templateUrl: './login-phone-verification.page.html',
  styleUrls: ['./login-phone-verification.page.scss'],
})
export class LoginPhoneVerificationPage implements OnInit {

  public obj = document.getElementById('partitioned');
  public inputFocus1: boolean;
  public inputFocus2: boolean;
  public inputFocus3: boolean;
  public inputFocus4: boolean;
  public otpInput1: any;
  public otpInput2: any;
  public otpInput3: any;
  public otpInput4: any;
  phoneNumber: any;

  constructor(private route: Router, private menuCtrl: MenuController, public activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe((params) => {

      this.phoneNumber = params.input;

    });
    this.inputFocus2 = true;
  }

  ngOnInit() {
  }

  verify() {
    this.route.navigate(['home']);
  }

  onchange(num) {
    if (num === 1) {
      this.inputFocus1 = false;
      this.inputFocus2 = true;
    } else if (num === 2) {
      this.inputFocus3 = true;
    } else if (num === 3) {
      this.inputFocus4 = true;
    } else {
      this.inputFocus1 = false;
      this.inputFocus2 = false;
      this.inputFocus3 = false;
      this.inputFocus4 = false;

    }

  }
  next(el, val) {
    const numberRegex = /^[0-9\s]*$/;
    const regexp = /^\S*$/;
    if (val === '1' && numberRegex.test(this.otpInput1) && regexp.test(this.otpInput1)) {
      el.setFocus();
    } else if (val === '2' && numberRegex.test(this.otpInput2) && regexp.test(this.otpInput2)) {
      el.setFocus();
    } else if (val === '3' && numberRegex.test(this.otpInput3) && regexp.test(this.otpInput3)) {
      el.setFocus();
    }

  }
  preview(el) {
    if (el === 'otp4') {
      el.setFocus();
    }

  }

}
