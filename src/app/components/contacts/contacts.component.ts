/** */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { DataService } from '@app/services/data.service';
import { Router } from '@angular/router';
import { MatchIconsComponent } from '../match-icons/match-icons.component';
import { environment } from '@env/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { StorageService } from '@app/shared/services/storage.service';
import { mergeMap } from 'rxjs/operators';
import { LocalNotificationService } from '@app/shared/services/local-notification.service';

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
    public route: Router,
    private storageService: StorageService,
    private localNotificationService: LocalNotificationService
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
    this.storageService
      .getItem('userId')
      .pipe(
        mergeMap((userId) => {
          const userRef = this.firestore
            .collection('Users')
            .doc(userId as string);
          return from(userRef.get());
        })
      )
      .subscribe(
        (ref: any) => {
          if (ref.exists) {
            this.userDataDetails = ref.data();
            console.log('userDataDetails', this.userDataDetails);
            this.userDataDetails.age = this.calculateAge(
              this.userDataDetails.birthDate
            );
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

  calculateAge(birthday: string) {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  openGoldModal() {
    this.dataService.openModal(MatchIconsComponent, this.modalGold);
  }
  openMatchPlusModal() {
    this.dataService.openModal(MatchIconsComponent, this.modalRefreshData);
  }
  gotoFunctions(data: any) {
    if (data === 'create') {
      this.route.navigate(['edit']);
    } else if (data === 'settings') {
      return this.localNotificationService.showNotification(
        'This feature is coming soon',
        'info-main'
      );
      // this.route.navigate(['settings']);
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
