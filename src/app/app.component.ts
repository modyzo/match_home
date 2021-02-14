/** */
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TokenizerService } from './services/tokenizer.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(
    public platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private tokenizerService: TokenizerService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.getToken();
    });
  }

  getToken() {
    this.tokenizerService.getToken().subscribe(
      (data) => {
        localStorage.setItem('token', data.token);
      },
      (error) => {
        console.log(`Error in obtaining token ${error}`);
      }
    );
  }
}
