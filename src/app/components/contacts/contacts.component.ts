/** */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { DataService } from '@app/services/data.service';
import { Router } from '@angular/router';
import { TinderIconsComponent } from '../tinder-icons/tinder-icons.component';
import { environment } from '@env/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  userDetail: { userDetails: string }[];
  modalGold: any;
  modalRefreshData: any;
  @ViewChild('Slides', { static: false }) slides: IonSlides;
  slideOpts = {
    effect: 'flip',
    direction: 'horizontal',
    autoplay: {
      delay: 2000,
    },
  };
  index = 0;
  showButton: boolean;
  userDataDetails;

  public objectUrl;
  constructor(
    public dataService: DataService,
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    public route: Router
  ) {
    this.userDetail = environment.details;
    this.modalGold = environment.gold;
    this.modalRefreshData = environment.refresh;
    this.showButton = true;
  }

  ngOnInit() {
    this.getUserData();
  }

  public getUserData() {
    const userId = localStorage.getItem('userId');
    const userRef = this.firestore.collection('Users').doc(userId);
    const getData = from(userRef.get()).subscribe(
      (ref: any) => {
        if (ref.exists) {
          this.userDataDetails = ref.data();
          console.log('userDataDetails', this.userDataDetails);

          //
          const pathReference = this.fireStorage.ref(
            this.userDataDetails.profilePicture
          );

          from(pathReference.getDownloadURL()).subscribe((dataLink) => {
            this.objectUrl = dataLink;
          });
          //
        } else {
          console.log('No such document!');
        }
      },
      (error) => {
        console.log('error, userRef', error);
      }
    );
  }

  openGoldModal() {
    this.dataService.openModal(TinderIconsComponent, this.modalGold);
  }
  openTinderPlusModal() {
    this.dataService.openModal(TinderIconsComponent, this.modalRefreshData);
  }
  gotoFunctions(data: any) {
    if (data === 'create') {
      this.route.navigate(['edit']);
    } else if (data === 'settings') {
      this.route.navigate(['settings']);
    }
  }
  async change() {
    await this.slides.getActiveIndex().then((data) => (this.index = data));
    if (this.index === 0) {
      this.showButton = true;
    } else if (this.index !== 0) {
      this.showButton = false;
    }
  }
  gotoAddMedia() {
    this.route.navigate(['add-media']);
  }
}
