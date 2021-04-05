/** */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PropertiesUpdatePhotoPage } from './properties-update-photo.page';

const routes: Routes = [
  {
    path: '',
    component: PropertiesUpdatePhotoPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  declarations: [PropertiesUpdatePhotoPage],
})
export class PropertiesUpdatePhotoPageModule {}
