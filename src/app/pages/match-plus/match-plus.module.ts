/** */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MatchPlusPage } from './match-plus.page';

const routes: Routes = [
  {
    path: '',
    component: MatchPlusPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MatchPlusPage],
})
export class MatchPlusPageModule {}
