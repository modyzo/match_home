/** */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@app/services/data.service';
import { NavController, PopoverController } from '@ionic/angular';
import { ShareProfileComponent } from '../share-profile/share-profile.component';
import { ReportComponent } from '../report/report.component';
import { FeedPopoverComponent } from '../feed-popover/feed-popover.component';
import { ChatStartComponent } from '../chat-start/chat-start.component';
import { environment } from '@env/environment';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-message-feed',
  templateUrl: './message-feed.component.html',
  styleUrls: ['./message-feed.component.scss'],
})
export class MessageFeedComponent implements OnInit {
  profileData: any;
  icons: any;
  slideOpts = {
    effect: 'flip',
    direction: 'horizontal',
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
  };
  constructor(
    public activeRouter: ActivatedRoute,
    public service: DataService,
    public navCtrl: NavController,
    public popOver: PopoverController,
    public apiService: ApiService
  ) {
    this.icons = environment.footer_icons;
    this.activeRouter.params.subscribe((params) => {
      console.log(params.userData);
      if (params.userData) {
        this.profileData = JSON.parse(params.userData);
      }
    });
  }
  goBack() {
    this.navCtrl.back();
  }

  ngOnInit() {
    this.apiService.getActivities().subscribe((activities) => {
      console.log('data activities', activities);
    });
  }

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
  async change() {}
  async openPopover(ev) {
    const popover = await this.popOver.create({
      component: FeedPopoverComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
  openChatComponent() {
    this.service.openModal(ChatStartComponent, '');
  }
}
