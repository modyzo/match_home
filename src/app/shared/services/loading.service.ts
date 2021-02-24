import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { from } from 'rxjs';
import { mergeMap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    public loadingController: LoadingController
  ) { }

  public startLoading(functionParams) {
    return from(this.loadingController.create({
      message: '<div class="load"></div>',
      cssClass: 'loading',
      translucent: true,
      showBackdrop: true,
      spinner: null,
    })).pipe(
      mergeMap((loading) => {
        return from(loading.present()).pipe(
          mergeMap(() => functionParams)
        )
      }),
      finalize(() => this.loadingController.dismiss())
    );
  }
}
