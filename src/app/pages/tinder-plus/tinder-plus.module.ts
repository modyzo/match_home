/** */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TinderPlusPage } from './tinder-plus.page';

const routes: Routes = [
  {
    path: '',
    component: TinderPlusPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TinderPlusPage]
})
export class TinderPlusPageModule { }
