import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login-phone-verification',
  templateUrl: './login-phone-verification.page.html',
  styleUrls: ['./login-phone-verification.page.scss'],
})
export class LoginPhoneVerificationPage implements OnInit {
  private confirmationResult: firebase.auth.ConfirmationResult;
  public obj = document.getElementById('partitioned');
  public inputFocus1: boolean;
  public inputFocus2: boolean;
  public inputFocus3: boolean;
  public inputFocus4: boolean;
  public inputFocus5: boolean;
  public inputFocus6: boolean;
  public otpInput1: any;
  public otpInput2: any;
  public otpInput3: any;
  public otpInput4: any;
  public otpInput5: any;
  public otpInput6: any;
  public phoneNumber: any;
  private recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  constructor(
    private route: Router,
    private menuCtrl: MenuController,
    public activeRoute: ActivatedRoute,
    private angularFireAuth: AngularFireAuth
  ) {
    this.activeRoute.params.subscribe((params) => {
      this.phoneNumber = params.phoneNumber;
      console.log(this.phoneNumber);
    });
    this.inputFocus2 = true;
  }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
      }
    );
    this.recaptchaVerifier.render();
    console.log(this.recaptchaVerifier);
    this.onGetOTP();
  }

  public verify() {
    const otp =
      this.otpInput1.toString() +
      this.otpInput2.toString() +
      this.otpInput3.toString() +
      this.otpInput4.toString() +
      this.otpInput5.toString() +
      this.otpInput6.toString();

    this.confirmationResult
      .confirm(otp)
      .then((resp) => {
        console.log('resp', resp);
        this.route.navigate(['home']);
      })
      .catch((reason) => alert(`Error: ${reason}`));
  }

  public onchange(num) {
    if (num === 1) {
      this.inputFocus1 = false;
      this.inputFocus2 = true;
    } else if (num === 2) {
      this.inputFocus3 = true;
    } else if (num === 3) {
      this.inputFocus4 = true;
    } else if (num === 4) {
      this.inputFocus5 = true;
    } else if (num === 5) {
      this.inputFocus6 = true;
    } else {
      this.inputFocus1 = false;
      this.inputFocus2 = false;
      this.inputFocus3 = false;
      this.inputFocus4 = false;
      this.inputFocus5 = false;
      this.inputFocus6 = false;
    }
  }

  public next(el, val) {
    const numberRegex = /^[0-9\s]*$/;
    const regexp = /^\S*$/;
    if (
      val === '1' &&
      numberRegex.test(this.otpInput1) &&
      regexp.test(this.otpInput1)
    ) {
      el.setFocus();
    } else if (
      val === '2' &&
      numberRegex.test(this.otpInput2) &&
      regexp.test(this.otpInput2)
    ) {
      el.setFocus();
    } else if (
      val === '3' &&
      numberRegex.test(this.otpInput3) &&
      regexp.test(this.otpInput3)
    ) {
      el.setFocus();
    } else if (
      val === '4' &&
      numberRegex.test(this.otpInput4) &&
      regexp.test(this.otpInput4)
    ) {
      el.setFocus();
    } else if (
      val === '5' &&
      numberRegex.test(this.otpInput5) &&
      regexp.test(this.otpInput5)
    ) {
      el.setFocus();
    }
  }

  public preview(el) {
    if (el === 'otp6') {
      el.setFocus();
    }
  }

  public onGetOTP() {
    this.angularFireAuth.auth
      .signInWithPhoneNumber(this.phoneNumber, this.recaptchaVerifier)
      .then((confirmationResult) => {
        console.log('confirmationResult', confirmationResult);
        this.confirmationResult = confirmationResult;
      })
      .catch((reason) => alert(`Error: ${reason}`));
  }
}
