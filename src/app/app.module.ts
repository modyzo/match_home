
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TinderIconsComponent } from '@app/components/tinder-icons/tinder-icons.component';
import { ShareProfileComponent } from '@app/components/share-profile/share-profile.component';
import { ChatStartComponent } from '@app/components/chat-start/chat-start.component';
import { FormsModule } from '@angular/forms';
import { ReportComponent } from '@app/components/report/report.component';
import { FeedPopoverComponent } from '@app/components/feed-popover/feed-popover.component';
import { MatchComponent } from '@app/components/match/match.component';
import { ToggleLoginComponent } from '@app/components/toggle-login/toggle-login.component';
import { RefreshComponent } from '@app/components/refresh/refresh.component';
import { AccountDeleteReasonComponent } from '@app/components/account-delete-reason/account-delete-reason.component';
import { TermsComponent } from '@app/components/terms/terms.component';
import { Device } from '@ionic-native/device/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';


import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent,
    TinderIconsComponent,
    ShareProfileComponent,
    ChatStartComponent,
    ReportComponent,
    FeedPopoverComponent,
    MatchComponent,
    ToggleLoginComponent,
    RefreshComponent,
    AccountDeleteReasonComponent,
    TermsComponent
  ],
  entryComponents: [TinderIconsComponent,
    ShareProfileComponent,
    ChatStartComponent,
    ReportComponent,
    FeedPopoverComponent,
    MatchComponent,
    ToggleLoginComponent,
    TermsComponent,
    RefreshComponent,
    AccountDeleteReasonComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFirestoreModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),


  ],
  providers: [
    StatusBar,
    SplashScreen,
    Device,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

