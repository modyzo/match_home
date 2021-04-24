/** */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { DataService } from '@app/services/data.service';
import {
  availabilityOfBuildingList,
  currencyObject,
  sexObject,
  stateOfBuildingList,
  energyPerformanceCertificateObject,
  GardenOrientationObject,
} from '@app/shared/constants/variables';
import { LocalNotificationService } from '@app/shared/services/local-notification.service';
import { StorageService } from '@app/shared/services/storage.service';
import { environment } from '@env/environment';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-properties',
  templateUrl: './add-properties.page.html',
  styleUrls: ['./add-properties.page.scss'],
})
export class AddPageProperties implements OnInit {
  data: any;
  imageData: any;
  public AddPagePropertiesForm: FormGroup;
  public sexObject = sexObject;
  public availability = availabilityOfBuildingList;
  public stateOfBuild = stateOfBuildingList;
  public currencyObject = currencyObject;
  public energyPerformanceCertificateObject = energyPerformanceCertificateObject;
  public GardenOrientationObject = GardenOrientationObject;

  constructor(
    public serviceProvider: DataService,
    private apiService: ApiService,
    public formBuilder: FormBuilder,
    private localNotificationService: LocalNotificationService,
    private router: Router
  ) {
    this.data = environment.editInfo;
    this.imageData = environment.images;
    this.AddPagePropertiesForm = this.formBuilder.group({
      price: [null, Validators.required],
      currency: [null, Validators.required],
      area: [null, Validators.compose([Validators.required])],
      name: [
        null,
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(64),
          Validators.required,
        ]),
      ],
      rooms: ['', Validators.compose([Validators.required])],
      bathRooms: [null],
      garage: [null],
      availability: [null],
      stateOfBuild: [null],
      kitchen: [null],
      description: [null],
      yearOfConstruction: [null],
      bedrooms: [null],
      garden: [null],
      gardenOrientation: [null],
      landArea: [null],
      livingSpace: [null],
      energyPerformanceCertificate: [null],
    });
  }

  ngOnInit() {
    this.AddPagePropertiesForm.valueChanges.subscribe((res) =>
      console.log(res)
    );
    this.getUserData();
  }

  public getUserData() {
    this.apiService.getProfile().subscribe(
      (data: any) => {},
      (error) => {
        console.log('error', error);
      }
    );
  }

  applyForm = () => {
    this.apiService
      .createProperties(this.AddPagePropertiesForm.value)
      .subscribe(
        () => {
          this.localNotificationService.showNotification(
            'Properties succesfully added',
            'success-main'
          );
          this.router.navigate(['home']);
        },
        (error) => {
          this.localNotificationService.showNotification(error, 'error-main');
        }
      );
  };
}
