import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { mergeMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { LocalNotificationService } from '@app/shared/services/local-notification.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  public signUpForm: FormGroup;
  public sexObject = [
    { value: 'man', name: 'Mens' },
    { value: 'woman', name: 'Vrouw' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private localNotificationService: LocalNotificationService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(21)
        ])
      ],
      sex: [null, Validators.required],
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
    });
  }

  ngOnInit() { }

  public signUp() {
    return from(this.angularFireAuth.createUserWithEmailAndPassword(
      this.signUpForm.get('email').value,
      this.signUpForm.get('password').value
    )).pipe(
      mergeMap((res: any) => {
        console.log(res);
        const collectinoRef = this.firestore.collection('/Users');
        console.log("collectinoRef", collectinoRef);
        localStorage.setItem('userId', res.user.uid);
        return from(collectinoRef.doc(res.user.uid).set(this.signUpForm.value))
      }),
      mergeMap(() => {
        return from(this.angularFireAuth.currentUser)
      }),
      mergeMap((user) => {
        return from(user.sendEmailVerification());
      })
    ).subscribe(
      (res) => {
        console.log(res);
        this.localNotificationService.showNotification(
          'We have sent an email with a confirmation link to your email address. In order to complete the sign-up process, please click the confirmation link.',
          'success-main'
        );
        this.router.navigate(['login']);
      },
      (error) => {
        console.log(error);
        this.localNotificationService.showNotification(error.message, 'error-main');
      }
    );
  }

}
