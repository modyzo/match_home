import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
}
