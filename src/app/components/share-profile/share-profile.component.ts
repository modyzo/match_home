/** */
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-share-profile',
  templateUrl: './share-profile.component.html',
  styleUrls: ['./share-profile.component.scss']
})
export class ShareProfileComponent implements OnInit {

  constructor(public popCtrl: PopoverController) { }
  closePopOver() {
    this.popCtrl.dismiss();
  }
  ngOnInit() {
  }

}
