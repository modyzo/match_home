import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { DataService } from '@app/services/data.service';
import { LocalNotificationService } from '@app/shared/services/local-notification.service';
import { StorageService } from '@app/shared/services/storage.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
  public verifyForm: FormGroup;
  constructor(
    public route: Router,
    public service: DataService,
    private authService: AuthService,
    private activeRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private localNotificationService: LocalNotificationService
  ) {
    this.verifyForm = this.formBuilder.group({
      token: [
        null,
        Validators.compose([Validators.required,]),
      ],
    });
  }

  ngOnInit() {
    this.activeRouter.params.subscribe((params) => {
      console.log('params', params);
      this.verifyForm.patchValue(params);
    });
  }
  

  public verify() {
    return this.authService.verifyAccount(
      this.verifyForm.get('token').value,
    ).subscribe(
      (token) => {
        console.log('token', token);
        of(this.authService.sendToken(token));
        this.route.navigate(['/login']);
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
