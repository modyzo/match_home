/** */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '@app/services/data.service';
import { LocalNotificationService } from '@app/shared/services/local-notification.service';
import { StorageService } from '@app/shared/services/storage.service';
import { environment } from '@env/environment';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

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
  public sexObject = [
    { value: 'man', name: 'Mens' },
    { value: 'woman', name: 'Vrouw' },
  ];
  public imageBlob: Blob;
  public fileToUpload;
  public objectUrl;

  public userDocRef: DocumentReference;
  constructor(
    public serviceProvider: DataService,
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private angularFireAuth: AngularFireAuth,
    public formBuilder: FormBuilder,
    private localNotificationService: LocalNotificationService,
    private storageService: StorageService
  ) {
    this.data = environment.editInfo;
    this.imageData = environment.images;
    this.editPageForm = this.formBuilder.group({
      sex: [null, Validators.required],
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
    this.storageService
      .getItem('userId')
      .pipe(
        mergeMap((userId) => {
          const userRef = this.firestore.collection('Users').doc(userId);
          return from(userRef.get());
        })
      )
      .subscribe(
        (ref: any) => {
          this.userDocRef = ref;
          if (ref.exists) {
            const userDataDetails = ref.data();
            console.log('userDataDetails', userDataDetails);
            const pathReference = this.fireStorage.ref(
              userDataDetails.profilePicture
            );

            from(pathReference.getDownloadURL()).subscribe((dataLink) => {
              this.objectUrl = dataLink;
            });
            //

            if (userDataDetails) {
              this.editPageForm
                .get('firstName')
                .setValue(userDataDetails.firstName);
              this.editPageForm
                .get('lastName')
                .setValue(userDataDetails.lastName);
              this.editPageForm.get('phone').setValue(userDataDetails.phone);
              this.editPageForm
                .get('birthDate')
                .setValue(userDataDetails.birthDate);
              this.editPageForm.get('sex').setValue(userDataDetails.sex);
            }
          } else {
            console.log('No such document!');
          }
        },
        (error) => {
          console.log('error, userRef', error);
        }
      );
  }

  applyForm = () => {
    this.storageService
      .getItem('userId')
      .pipe(
        mergeMap((userId) => {
          const collectinoRef = this.firestore.collection('/Users');
          return from(
            collectinoRef.doc(userId).update(this.editPageForm.value)
          );
        })
      )
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
    console.log('this.', this.fileUpload.nativeElement.files[0]);
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
        // Create a root reference
        this.storageService.getItem('userId').subscribe((userId) => {
          const storageRef = this.fireStorage.ref(
            '/users/' + userId + '/profilePicture'
          );
          const avatarRef = storageRef.child('avatar.jpg');
          const avatarImagesRef = storageRef.child('images/avatar.jpg');

          // While the file names are the same, the references point to different files
          avatarRef.name === avatarImagesRef.name; // true
          avatarRef.fullPath === avatarImagesRef.fullPath; // false
          return from(avatarRef.put(this.imageBlob)).subscribe(
            (snapshot: any) => {
              this.storageService
                .getItem('userId')
                .pipe(
                  mergeMap((userId) => {
                    const collectinoRef = this.firestore.collection('/Users');
                    return from(
                      collectinoRef
                        .doc(userId)
                        .update({ profilePicture: snapshot.metadata.fullPath })
                    );
                  })
                )
                .subscribe(
                  () => {
                    this.localNotificationService.showNotification(
                      'You have successfully updated your avatar',
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
            },
            (error) => {
              this.localNotificationService.showNotification(
                error,
                'error-main'
              );
            }
          );
        });
      }
    };
  }
}
