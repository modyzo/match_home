import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@app/services/data.service';
import { ToggleLoginComponent } from '@app/components/toggle-login/toggle-login.component';
import { environment } from '@env/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, of } from 'rxjs';
import { LocalNotificationService } from '@app/shared/services/local-notification.service';
import { StorageService } from '@app/shared/services/storage.service';
import { AuthService } from '@app/services/auth.service';

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
    public router: Router,
    public service: DataService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private localNotificationService: LocalNotificationService
  ) {
    this.showContent = true;
    this.data = environment.LOGIN_SLIDES_DATA;
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(21),
        ]),
      ],
    });
  }
  ngOnInit() { }
  toggleContent() {
    this.service.openModal(ToggleLoginComponent, '', 'modalBackground');
  }
  loginWithPhone() {
    this.router.navigate(['login-phone']);
  }
  gotAccountRecovery() {
    this.router.navigate(['account-recovery']);
  }

  public goToSignUp() {
    this.router.navigate(['sign-up']);
  }

  public login() {
    return this.authService.signIn({
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    }).subscribe(
      (data) => {
        of(this.authService.sendToken(data.token));
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error);
        this.localNotificationService.showNotification(
          error.message,
          'error-main'
        );
      }
    );
  }
}
