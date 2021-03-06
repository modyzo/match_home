import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  availabilityOfBuildingList,
  stateOfBuildingList,
  energyPerformanceCertificateObject,
  GardenOrientationObject,
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

  public energyPerformanceCertificateObject = energyPerformanceCertificateObject;
  public GardenOrientationObject = GardenOrientationObject;

  constructor(
    private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private navParams: NavParams
  ) {
    this.filterForm = this.formBuilder.group({
      price: [{ lower: 1, upper: 3000000 }],
      square: [{ lower: 0, upper: 1000 }],
      rooms: [{ lower: 0, upper: 15 }],
      bathroom: [{ lower: 0, upper: 15 }],
      availability: [null],
      stateOfBuild: [null],
      garage: [{ lower: 0, upper: 15 }],
      kitchen: [{ lower: 0, upper: 15 }],
      yearOfConstruction: [{ lower: 1900, upper: 2020 }],
      bedrooms: [{ lower: 0, upper: 200 }],
      garden: [{ lower: 0, upper: 200 }],
      gardenOrientation: [null],
      landArea: [{ lower: 0, upper: 200 }],
      livingSpace: [{ lower: 0, upper: 200 }],
      energyPerformanceCertificate: [null],
    });

    if (this.navParams.get('data')) {
      this.filterForm.patchValue(this.navParams.get('data'));
    }
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
