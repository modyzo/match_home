import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { FilterComponent } from '@app/components/filter/filter.component';
import { SeparatorComponent } from '@app/components/separator/separator.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private componentTypes = {
    filter: FilterComponent,
    separator: SeparatorComponent,
  };

  constructor(public modalCtrl: ModalController) {}

  async openModal(comp, props, cssClass?) {
    const modal = await this.modalCtrl.create({
      component: comp,
      componentProps: { value: props },
      cssClass: cssClass,
    });
    return modal.present();
  }

  public openRxModal(
    component: string,
    data?: any,
    backdropDismiss?: boolean,
    cssClass?: string,
    showBackdrop?: boolean
  ) {
    return from(
      this.modalCtrl.create({
        component: this.componentTypes[component],
        componentProps: data ? { data } : null,
        backdropDismiss: backdropDismiss ? backdropDismiss : false,
        cssClass: cssClass ? cssClass : '',
        showBackdrop: showBackdrop ? showBackdrop : false,
      })
    ).pipe(
      mergeMap((modal) => {
        return from(modal.present()).pipe(
          mergeMap(() => {
            return from(modal.onDidDismiss());
          })
        );
      })
    );
  }
}
