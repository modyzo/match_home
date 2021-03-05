/** */
import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-icons',
  templateUrl: './match-icons.component.html',
  styleUrls: ['./match-icons.component.scss'],
})
export class MatchIconsComponent implements OnInit {
  data: any;
  slideOpts = {
    effect: 'flip',
  };
  @Input() value: any;
  show: boolean;
  isIos: boolean;
  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public route: Router,
    public platform: Platform
  ) {
    this.data = this.navParams.get('value');
    this.show = false;
    this.isIos = this.platform.is('ios');
  }

  ngOnInit() {}
  closeModal(id: any) {
    this.modalCtrl.dismiss();
    if (id === 'star' || ('refresh' && id !== 'rocket')) {
      this.route.navigate(['match-plus']);
    }
  }
  showCustomButton(index: any) {
    if (index === 1) {
      this.show = true;
    } else if (index === 0 || 2) {
      this.show = false;
    }
  }
}
