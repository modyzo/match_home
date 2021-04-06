/** */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { DataService } from '@app/services/data.service';
import { LocalNotificationService } from '@app/shared/services/local-notification.service';
import { StorageService } from '@app/shared/services/storage.service';
import { environment } from '@env/environment';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  @ViewChild('fileUpload') fileUpload: ElementRef;
  driveLink = environment.driveLink;

  data: any;
  id: string = '';
  imageData: any;
  public uploadPageForm: FormGroup;
  public sexObject = [
    { value: 'male', name: 'Mens' },
    { value: 'female', name: 'Vrouw' },
  ];
  public imageBlob: Blob;
  public fileToUpload;
  public objectUrl;
  pictures = [];

  constructor(
    public serviceProvider: DataService,
    public formBuilder: FormBuilder,
    private localNotificationService: LocalNotificationService,
    private storageService: StorageService,
    private apiService: ApiService,
    private activeRouter: ActivatedRoute
  ) {
    this.activeRouter.params.subscribe((params) => {
      console.log('params', params);
      this.id = params.id;
    });
  }

  ngOnInit() {
    this.getPropertiesDetails();
  }

  public getPropertiesDetails() {
    this.apiService.getPropertiesDetails(this.id).subscribe(
      (data: any) => {
        this.pictures = data.pictures;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

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
        formData.append(`file`, blob, 'photo.jpg');

        return this.apiService
          .updatePropertiesPhoto(formData, this.id)
          .subscribe(
            (data) => {
              this.pictures = data.pictures;
              this.localNotificationService.showNotification(
                'You have successfully updated Photo',
                'success-main'
              );
            },
            (error) => {
              this.localNotificationService.showNotification(
                error,
                'error-main'
              );
            }
          );
      }
    };
  }

  public removePhoto(photoId: string) {
    this.apiService.removePictures(this.id, photoId).subscribe(
      (data: any) => {
        this.pictures = data.pictures;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
}
