import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { mergeMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { LocalNotificationService } from '@app/shared/services/local-notification.service';
import { StorageService } from '@app/shared/services/storage.service';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  public signUpForm: FormGroup;
  public sexObject = [
    { value: 'MALE', name: 'Mens' },
    { value: 'FEMALE', name: 'Vrouw' },
  ];

  public roleObject = [
    { value: 'AGENT', name: 'agent' },
    { value: 'USER', name: 'user' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localNotificationService: LocalNotificationService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
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
      gender: [null, Validators.required],
      birthDate: [null, Validators.compose([Validators.required])],
      phone: [
        null,
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(21),
          Validators.required,
        ]),
      ],
      firstName: [
        null,
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(64),
          Validators.required,
        ]),
      ],
      lastName: [
        null,
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(64),
          Validators.required,
        ]),
      ],
      role: [
        null, 
        Validators.compose([
          Validators.required,
        ]),
      ]
    });
  }

  ngOnInit() {}

  public signUp() {
    return this.authService.signUp(
      this.signUpForm.value
    ).subscribe(
      () => {
        this.localNotificationService.showNotification(
          'We have sent an email with a confirmation link to your email address. In order to complete the sign-up process, please click the confirmation link.',
          'success-main'
        );
        this.router.navigate(['login']);
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
