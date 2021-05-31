import { NgModule, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatchIconsComponent } from '@app/components/match-icons/match-icons.component';
import { ShareProfileComponent } from '@app/components/share-profile/share-profile.component';
import { ChatStartComponent } from '@app/components/chat-start/chat-start.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { environment } from '../environments/environment';
import { TokenizerService } from './services/tokenizer.service';
import { CapitalCasePipe } from './shared/pipes/capital-case.pipe';
import { CustomToastrComponent } from './shared/components/custom-toastr/custom-toastr.component';
import { File } from '@ionic-native/file/ngx';
import { HttpRequestsInterceptor } from './services/add-token-interceptors.service';
import { AuthService } from './services/auth.service';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { VerifyPage } from './pages/verify/verify.page';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = {
  url: environment.ws_url,
  options: {
    transports: ['websocket'],
    pingTimeout: 5000,
    pingInterval: 25000,
    path: '/api/socket.io/'
  },
};
@NgModule({
  declarations: [
    AppComponent,
    MatchIconsComponent,
    ShareProfileComponent,
    ChatStartComponent,
    ReportComponent,
    FeedPopoverComponent,
    MatchComponent,
    ToggleLoginComponent,
    RefreshComponent,
    AccountDeleteReasonComponent,
    TermsComponent,
  ],
  entryComponents: [
    MatchIconsComponent,
    ShareProfileComponent,
    ChatStartComponent,
    ReportComponent,
    FeedPopoverComponent,
    MatchComponent,
    ToggleLoginComponent,
    TermsComponent,
    RefreshComponent,
    AccountDeleteReasonComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    SocketIoModule.forRoot(config),
    ToastrModule.forRoot({
      toastComponent: CustomToastrComponent,
      preventDuplicates: false,
      maxOpened: 1,
      autoDismiss: true,
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Device,
    NativeStorage,
    TokenizerService,
    AuthService,
    Deeplinks,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestsInterceptor,
      multi: true,
    },
    File,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private deeplinks: Deeplinks,
    private router: Router,
    private zone: NgZone,
    private platform: Platform
  ) {
    this.setupDeeplink();
  }

  private setupDeeplink() {
    return from(this.platform.ready())
      .pipe(
        mergeMap(() => {
          return this.deeplinks.route({
            '/verify/:token': VerifyPage,
            // '/reset-password/:token': ResetPasswordComponent,
          });
        })
      )
      .subscribe(
        (match: any) => {
          console.log(match);
          this.zone.run(() =>
            this.router.navigate([`${match.$link.path}`], { replaceUrl: true })
          );
        },
        (noMatch) => {
          console.log(noMatch);
        }
      );
  }
}
