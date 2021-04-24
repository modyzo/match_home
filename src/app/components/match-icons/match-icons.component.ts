/** */
import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '@app/services/api.service';

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
  boosts = [];
  @Input() value: any;
  show: boolean;
  isIos: boolean;
  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public route: Router,
    public platform: Platform,
    public apiService: ApiService
  ) {
    this.data = this.navParams.get('value');
    console.log('this.data', this.data);
    this.show = false;
    this.isIos = this.platform.is('ios');
  }

  ngOnInit() {
    this.apiService.getBoosts().subscribe((data: Array<object>) => {
      this.boosts = data;
    });
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }

  showCustomButton(index: any) {
    this.modalCtrl.dismiss(index);
  }
}
