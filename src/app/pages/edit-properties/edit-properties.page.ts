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
  selector: 'app-edit-properties',
  templateUrl: './edit-properties.page.html',
  styleUrls: ['./edit-properties.page.scss'],
})
export class EditPageProperties implements OnInit {
  @ViewChild('fileUpload') fileUpload: ElementRef;
  data: any;
  imageData: any;
  public editPagePropertiesForm: FormGroup;
  public sexObject = sexObject;

  public imageBlob: Blob;
  public fileToUpload;
  public objectUrl;

  public userDocRef: DocumentReference;
  constructor(
    public serviceProvider: DataService,
    private apiService: ApiService,
    public formBuilder: FormBuilder,
    private localNotificationService: LocalNotificationService,
    private storageService: StorageService
  ) {
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
      rooms: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.editPagePropertiesForm.valueChanges.subscribe((res) =>
      console.log(res)
    );
    this.getUserData();

    // this.apiService.updateProperties({    area: 34,
    //   currency: "dolla4",
    //   name: "232",
    //   price: "23",
    //   rooms: 3,
    //   updatedAt: "2021-04-02T18:42:48.344Z"}, '3b0d46c0-4e1e-45c5-837a-c35bbeb14c7c').subscribe(data => {console.log('data', data);})
  }

  public getUserData() {
    this.apiService.getProfile().subscribe(
      (data: any) => {
        this.editPagePropertiesForm.patchValue(data);
        this.objectUrl = data.avatarLink;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  applyForm = () => {
    this.apiService
      .createProperties(this.editPagePropertiesForm.value)
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

  public handleFileInput() {
    const fileToUpload = this.fileUpload.nativeElement.files[0];
    const fileType = fileToUpload.type;

    const reader = new FileReader();
    reader.readAsArrayBuffer(fileToUpload);
    reader.onloadend = () => {
      if (reader.error) {
        return;
      } else {
        const arrayBuffer = reader.result;
        let blob = new Blob([new Uint8Array(arrayBuffer as ArrayBuffer)], {
          type: fileType,
        });
        this.imageBlob = blob;
        this.objectUrl = URL.createObjectURL(this.imageBlob);

        const formData = new FormData();
        formData.append(`files[]`, blob, 'avatar.jpg');

        const id = '1ce070e5-9e0c-4d04-8532-cb12b27ab8a9';

        return this.apiService.updatePropertiesPhoto(formData, id).subscribe(
          () => {
            this.localNotificationService.showNotification(
              'You have successfully updated your avatar',
              'success-main'
            );
          },
          (error) => {
            this.localNotificationService.showNotification(error, 'error-main');
          }
        );
      }
    };
  }
}
