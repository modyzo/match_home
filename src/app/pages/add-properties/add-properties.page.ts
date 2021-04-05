/** */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { DataService } from '@app/services/data.service';
import { sexObject } from '@app/shared/constants/variables';
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

  public userDocRef: DocumentReference;
  constructor(
    public serviceProvider: DataService,
    private apiService: ApiService,
    public formBuilder: FormBuilder,
    private localNotificationService: LocalNotificationService
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
            'Profile details have succesfully updated',
            'success-main'
          );
        },
        (error) => {
          this.localNotificationService.showNotification(error, 'error-main');
        }
      );
  };
}
