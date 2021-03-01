/** */
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '@app/services/data.service';
import { environment } from '@env/environment';
import { from } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  data: any;
  imageData: any;
  public editPageForm: FormGroup;
  public sexObject = [
    { value: 'man', name: 'Mens' },
    { value: 'woman', name: 'Vrouw' },
  ];

  public userDocRef: DocumentReference;
  constructor(
    public serviceProvider: DataService,
    private firestore: AngularFirestore,
    public formBuilder: FormBuilder
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
    const userId = localStorage.getItem('userId');
    const userRef = this.firestore.collection('Users').doc(userId);
    const getData = from(userRef.get()).subscribe(
      (ref: any) => {
        this.userDocRef = ref;
        if (ref.exists) {
          const userDataDetails = ref.data();
          console.log('userDataDetails', userDataDetails);
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
    const collectinoRef = this.firestore.collection('/Users');
    return from(
      collectinoRef
        .doc(localStorage.getItem('userId'))
        .set(this.editPageForm.value)
    );
  };
}
