/** */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@app/services/api.service';
import { DataService } from '@app/services/data.service';
import { calculateAge } from '@app/shared/helprers/helpers';
import { LocalNotificationService } from '@app/shared/services/local-notification.service';
import { environment } from '@env/environment';
import { IonSlides } from '@ionic/angular';
import { MatchIconsComponent } from '../match-icons/match-icons.component';

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
    private apiService: ApiService,
    public route: Router,
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
    this.apiService.getProfile().subscribe(
      (data: any) => {
        this.userDataDetails = data;

        this.userDataDetails.age = calculateAge(this.userDataDetails.birthDate);
        this.objectUrl = this.userDataDetails.avatarLink;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  openGoldModal() {
    this.dataService
      .openRxModal('boostPage', this.modalGold, false, 'modal', false)

      .subscribe((res: any) => {
        if (res && res.data) this.buyPackage(res.data);
      });
  }

  buyPackage(id: number) {
    this.localNotificationService.showNotification(
      `Open paypay window with payment id: ${id}`,
      'info-main'
    );
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
