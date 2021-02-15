import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  availabilityOfBuildingList,
  stateOfBuildingList
} from '@app/shared/constants/variables';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public filterForm: FormGroup;
  public availability = availabilityOfBuildingList;
  public stateOfBuild = stateOfBuildingList;

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
  ) {
    this.filterForm = this.formBuilder.group({
      price: [{lower: 1, upper: 3000000}],
      square: [{lower: 1, upper: 1000}],
      squareGarden: [{lower: 1, upper: 10000}],
      bathroom: [null],
      availability: [null],
      stateOfBuild: [null],
      garage: [null]
    });
  }

  ngOnInit() {
    this.filterForm.valueChanges.subscribe((res) => console.log(res));
  }

  public closeModal() {
    this.modalCtrl.dismiss();
  }

  public applyFilter() {
    this.modalCtrl.dismiss(this.filterForm.value);
  }

}
