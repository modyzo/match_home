import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfileDetailsPage } from './profile-details.page';
import { CapitalCasePipe } from '@app/shared/pipes/capital-case.pipe';

const routes: Routes = [
  {
    path: '',
    component: ProfileDetailsPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProfileDetailsPage, CapitalCasePipe],
})
export class ProfileDetailsPageModule {}
