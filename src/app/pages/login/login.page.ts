
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@app/services/data.service';
import { ToggleLoginComponent } from '@app/components/toggle-login/toggle-login.component';
import { environment } from '@env/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { LocalNotificationService } from '@app/shared/services/local-notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  showContent: any;
  data: any = [];
  constructor(
    public route: Router,
    public service: DataService,
    private angularFireAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private localNotificationService: LocalNotificationService,
  ) {
    this.showContent = true;
    this.data = environment.LOGIN_SLIDES_DATA;
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(21)
        ])
      ]
    })
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

  public goToSignUp() {
    this.route.navigate(['sign-up']);
  }

  public login() {
    return from(this.angularFireAuth.signInWithEmailAndPassword(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value
    )).subscribe(
      (user) => {
        console.log(user);
        if (user.user.emailVerified) {
          this.route.navigate(['home']);
        } else {
          console.log('No verified');
          this.localNotificationService.showNotification(
            'Please, verify you account', 'error-main'
          );
        }
      },
      (error) => {
        console.log(error);
        this.localNotificationService.showNotification(error.message, 'error-main');
      }
    )
  }
}
