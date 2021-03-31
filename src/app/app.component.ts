/** */
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TokenizerService } from './services/tokenizer.service';
import { StorageService } from './shared/services/storage.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(
    public platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private tokenizerService: TokenizerService,
    private storageService: StorageService,
    private fireAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getCurrentUser();
    });
  }

  getCurrentUser() {
    this.fireAuth.onAuthStateChanged((user) => {
      if (user != null) {
        return from(this.fireAuth.currentUser);
      } else {
      }
    });
  }
}
