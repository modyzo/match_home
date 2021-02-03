import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@app/services/data.service';
import { NavController, PopoverController, Platform } from '@ionic/angular';
import { ShareProfileComponent } from '@app/components/share-profile/share-profile.component';
import { ReportComponent } from '@app/components/report/report.component';
import { environment } from '@env/environment';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.page.html',
  styleUrls: ['./profile-details.page.scss'],
})
export class ProfileDetailsPage implements OnInit {
  isIos: boolean;
  profileData: any;
  icons: any;
  slideOpts = {
    effect: 'flip',
    direction: 'horizontal',
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    // autoplay: {
    //   delay: 2000,
    // }
  };
  slidesData: any;
  name: any;
  price: any;
  bathrooms: any;
  distance: any;
  rooms: any;

  constructor(public activeRouter: ActivatedRoute, public service: DataService, public navCtrl: NavController, public popOver: PopoverController, public platform: Platform) {
    this.isIos = this.platform.is('ios');
    this.icons = environment.footer_icons;
    this.activeRouter.params.subscribe((params) => {
      this.profileData = JSON.parse(params.userData);
      this.slidesData = this.profileData.slides;
      this.name = this.profileData.name;
      this.price = this.profileData.price;
      this.bathrooms = this.profileData.bathrooms;
      this.distance = this.profileData.distance;
      this.rooms = this.profileData.rooms;
      console.log('param data coming from home', this.slidesData);
    });
  }
  goBack() {
    this.navCtrl.back();
  }
  ngOnInit() {
  }
  async openPopoverOptions(ev) {
    const popover = await this.popOver.create({
      component: ShareProfileComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  goForReport() {
    this.service.openModal(ReportComponent, '');
  }
  async change(ev: any) {
    // await this.slides.getActiveIndex().then(data => this.index = data);
    // // this.segment = this.data[this.index].title;
    // // this.drag();
    // if (this.index === 0) {
    //   this.showButton = true
    // } else if (this.index !== 0) {
    //   this.showButton = false
    // }
  }
}
