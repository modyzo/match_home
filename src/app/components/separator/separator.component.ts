import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  availabilityOfBuildingList,
  stateOfBuildingList,
} from '@app/shared/constants/variables';

@Component({
  selector: 'app-separator',
  templateUrl: './separator.component.html',
  styleUrls: ['./separator.component.scss'],
})
export class SeparatorComponent implements OnInit {
  public availability = availabilityOfBuildingList;
  public stateOfBuild = stateOfBuildingList;

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  public closeModal() {
    this.modalCtrl.dismiss();
  }

  public applyseparator() {
    this.modalCtrl.dismiss(true);
  }

  public disapplyseparator() {
    this.modalCtrl.dismiss(false);
  }
}
