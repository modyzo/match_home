/** */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { DataService } from '@app/services/data.service';
import {
  availabilityOfBuildingList,
  currencyObject,
  sexObject,
  stateOfBuildingList,
} from '@app/shared/constants/variables';
import { LocalNotificationService } from '@app/shared/services/local-notification.service';
import { StorageService } from '@app/shared/services/storage.service';
import { environment } from '@env/environment';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-properties',
  templateUrl: './edit-properties.page.html',
  styleUrls: ['./edit-properties.page.scss'],
})
export class EditPageProperties implements OnInit {
  @ViewChild('fileUpload') fileUpload: ElementRef;
  id = '';
  data: any;
  imageData: any;
  public editPagePropertiesForm: FormGroup;
  public sexObject = sexObject;

  public availability = availabilityOfBuildingList;
  public stateOfBuild = stateOfBuildingList;
  public currencyObject = currencyObject;
  public imageBlob: Blob;
  public fileToUpload;
  public objectUrl;

  public userDocRef: DocumentReference;
  constructor(
    public serviceProvider: DataService,
    private apiService: ApiService,
    public formBuilder: FormBuilder,
    private localNotificationService: LocalNotificationService,
    private storageService: StorageService,
    private activeRouter: ActivatedRoute,
    private router: Router
  ) {
    this.activeRouter.params.subscribe((params) => {
      this.id = params.id;
    });
    this.data = environment.editInfo;
    this.imageData = environment.images;

    this.editPagePropertiesForm = this.formBuilder.group({
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
      bathRooms: [null],
      garage: [null],
      availability: [null],
      stateOfBuild: [null],
      rooms: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.getPropertiesDetails();
  }

  public getPropertiesDetails() {
    this.apiService.getPropertiesDetails(this.id).subscribe(
      (data: any) => {
        this.editPagePropertiesForm.patchValue(data);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  applyForm = () => {
    this.apiService
      .updateProperties(this.editPagePropertiesForm.value, this.id)
      .subscribe(
        () => {
          this.localNotificationService.showNotification(
            'Properties details have succesfully updated',
            'success-main'
          );
          this.router.navigate(['/home']);
        },
        (error) => {
          this.localNotificationService.showNotification(error, 'error-main');
        }
      );
  };
}
