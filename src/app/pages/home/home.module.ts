import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import { SwingModule } from 'angular2-swing';
import { IonicSwingModule } from '../../ionic-swing/ionic-swing.module';
import { ChatComponent } from '@app/components/chat/chat.component';
import { ContactsComponent } from '@app/components/contacts/contacts.component';
import { MessageFeedComponent } from '@app/components/message-feed/message-feed.component';
import { FilterComponent } from '@app/components/filter/filter.component';
import { SeparatorComponent } from '@app/components/separator/separator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    IonicModule,
    HttpClientModule,
    SwingModule,
    IonicSwingModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      },
    ]),
  ],
  declarations: [
    HomePage,
    ChatComponent,
    ContactsComponent,
    MessageFeedComponent,
    FilterComponent,
    SeparatorComponent,
  ]
})
export class HomePageModule {}
