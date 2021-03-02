import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private platform: Platform,
    private storage: NativeStorage,
  ) { }

  public setItem(key, value) {
    return this.platform.is('cordova')
      ? this.storage.setItem(key, value)
      : localStorage.setItem(key, value);
  }

  public getItem(key) {
    return this.platform.is('cordova')
      ? from(this.storage.getItem(key)).subscribe((res) => res, (error) => null)
      : localStorage.getItem(key);
  }
}
