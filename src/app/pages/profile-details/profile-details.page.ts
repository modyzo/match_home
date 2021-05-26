import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '@app/services/data.service';
import {
  NavController,
  PopoverController,
  Platform,
  IonSlides,
} from '@ionic/angular';
import { ShareProfileComponent } from '@app/components/share-profile/share-profile.component';
import { ReportComponent } from '@app/components/report/report.component';
import { environment } from '@env/environment';
import {
  stateOfBuilding,
  mainDetailTranslate,
  mainDetailTranslateList,
  availabilityOfBuilding,
  gardenOrientationList,
} from '@app/shared/constants/variables';
import { adaptDataToNormalizedInfo } from '@app/shared/helprers/details-helper';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.page.html',
  styleUrls: ['./profile-details.page.scss'],
})
export class ProfileDetailsPage implements OnInit {
  @ViewChild('mySlider') slider: IonSlides;
  isIos: boolean;
  profileData: any;
  icons: any;
  stateOfBuilding = stateOfBuilding;
  mainDetailTranslateList = mainDetailTranslateList;
  mainDetailTranslate = mainDetailTranslate;
  availabilityOfBuilding = availabilityOfBuilding;
  gardenOrientationList = gardenOrientationList;
  slideOpts = {
    effect: 'flip',
    direction: 'horizontal',
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    autoplay: {
      delay: 2000,
    },
  };
  slidesData: any;
  name: any;
  price: any;
  bathrooms: any;
  distance: any;
  rooms: any;
  details = [];

  constructor(
    public activeRouter: ActivatedRoute,
    public service: DataService,
    public navCtrl: NavController,
    public popOver: PopoverController,
    public platform: Platform,
    public router: Router
  ) {
    this.isIos = this.platform.is('ios');
    this.icons = environment.footer_icons;
    this.activeRouter.params.subscribe((params) => {
      console.log('params', params);
      this.profileData = JSON.parse(params.userData);
      this.slidesData = this.profileData.pictures;
      this.name = this.profileData.name;
      this.price = this.profileData.price;
      this.distance = this.profileData.distance;
      console.log('param data coming from home', this.slidesData);
    });
  }
  goBack() {
    this.navCtrl.back();
  }

  ngOnInit() {}
  async openPopoverOptions(ev) {
    const popover = await this.popOver.create({
      component: ShareProfileComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
  goForReport() {
    this.service.openModal(ReportComponent, '');
  }
  async change(ev: any) {
    // await this.slidesData.getActiveIndex().then((data) => (this.index = data));
    // // this.segment = this.data[this.index].title;
    // // this.drag();
    // if (this.index === 0) {
    //   this.showButton = true
    // } else if (this.index !== 0) {
    //   this.showButton = false
    // }
  }

  async setActiveSliderIndex(index: any) {
    this.slider.slideTo(index);
  }

  clickedIconIs(title) {
    this.router.navigate(['home']);
  }
}
