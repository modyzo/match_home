/** */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPhoneVerificationPage } from './login-phone-verification.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPhoneVerificationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPhoneVerificationPage]
})
export class LoginPhoneVerificationPageModule { }
