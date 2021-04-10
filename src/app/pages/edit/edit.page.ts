/** */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { DataService } from '@app/services/data.service';
import { sexObject } from '@app/shared/constants/variables';
import { LocalNotificationService } from '@app/shared/services/local-notification.service';
import { StorageService } from '@app/shared/services/storage.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  @ViewChild('fileUpload') fileUpload: ElementRef;
  data: any;
  imageData: any;
  public editPageForm: FormGroup;
  public sexObject = sexObject;

  public imageBlob: Blob;
  public fileToUpload;
  public objectUrl;

  constructor(
    public serviceProvider: DataService,
    private apiService: ApiService,
    public formBuilder: FormBuilder,
    private localNotificationService: LocalNotificationService,
    private storageService: StorageService
  ) {
    this.data = environment.editInfo;
    this.imageData = environment.images;
    this.editPageForm = this.formBuilder.group({
      gender: [null, Validators.required],
      birthDate: [null, Validators.compose([Validators.required])],
      phone: [
        null,
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(64),
          Validators.required,
        ]),
      ],
      firstName: [
        '',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(64),
          Validators.required,
        ]),
      ],
      lastName: [
        '',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(64),
          Validators.required,
        ]),
      ],
    });
  }

  ngOnInit() {
    this.editPageForm.valueChanges.subscribe((res) => console.log(res));
    this.getUserData();
  }

  public getUserData() {
    this.apiService.getProfile().subscribe(
      (data: any) => {
        this.editPageForm.patchValue(data);
        this.objectUrl = data.avatarLink;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  applyForm = () => {
    this.apiService.updateProfile(this.editPageForm.value).subscribe(
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
        formData.append(`file`, blob, 'avatar.jpg');
        return this.apiService.updatePhoto(formData).subscribe(
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
