import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  availabilityOfBuildingList,
  stateOfBuildingList,
} from '@app/shared/constants/variables';
import { environment } from '@env/environment';

@Component({
  selector: 'app-separator',
  templateUrl: './separator.component.html',
  styleUrls: ['./separator.component.scss'],
})
export class SeparatorComponent implements OnInit {
  public availability = availabilityOfBuildingList;
  public stateOfBuild = stateOfBuildingList;
  public data: any;
  driveLink = environment.driveLink;
  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private navParams: NavParams
  ) {
    const data = this.navParams.get('data');
    if (data) {
      console.log('data', data);
      this.data = data;
    }
  }

  ngOnInit() {}

  public closeModal() {
    this.modalCtrl.dismiss();
  }

  public applyEmail() {
    this.modalCtrl.dismiss({ request: 'appointment', id: this.data.id });
  }

  public applyChat() {
    this.modalCtrl.dismiss({ request: 'chat', id: this.data.id });
  }

  public disapplyseparator() {
    this.modalCtrl.dismiss(false);
  }
}
