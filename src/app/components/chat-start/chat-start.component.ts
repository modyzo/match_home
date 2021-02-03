/** */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavParams, ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { ShareProfileComponent } from '../share-profile/share-profile.component';
@Component({
  selector: 'app-chat-start',
  templateUrl: './chat-start.component.html',
  styleUrls: ['./chat-start.component.scss']
})
export class ChatStartComponent implements OnInit {

  @ViewChild('IonContent', { static: true }) content: IonContent;

  data: {}[];
  customPopoverOptions: any = {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color'
  };
  paramData: any;
  msgList: any;
  userName: any;
  user_input = '';
  User = 'Me';
  toUser = 'HealthBot';
  start_typing: any;
  loader: boolean;
  show: boolean;
  footerJson: { 'icon': string; 'label': string; }[];

  constructor(public navParams: NavParams, public popCtrl: PopoverController, public modalCtrl: ModalController) {
    this.data = [{
      'text': 'Thursday 31 January 2019',
    }];

    this.paramData = this.navParams.get('value');
    this.msgList = [
      {
        userId: 'HealthBot',
        userName: 'HealthBot',
        userAvatar: '../../assets/chat/chat3.jpg',
        time: '12:00',
        message: 'Hello, have you seen this great chat UI',
        id: 0,
        status: 'checkmark'
      },
      {
        userId: 'Me',
        userName: 'Me',
        userAvatar: this.paramData.image ? this.paramData.image : '../../assets/chat/chat5.jpg',
        time: '12:03',
        message: 'Yeah, I see this. This looks great. ',
        id: 1,
        status: 'checkmark',
        name: 'Diana Nicole'

      },
      {
        userId: 'HealthBot',
        userName: 'HealthBot',
        userAvatar: '../../assets/chat/chat3.jpg',
        time: '12:05',
        message: '... and this is absolutely free, anyone can use',
        id: 3,
        status: 'done-all'
      },
      {
        userId: 'Me',
        userName: 'Me',
        userAvatar: '../../assets/chat/chat5.jpg',
        time: '12:06',
        message: 'wow ! that\'s great. Love to see more of such chat themes',
        id: 4,
        status: 'checkmark',
        name: 'Diana Nicole'

      },
      {
        userId: 'HealthBot',
        userName: 'HealthBot',
        userAvatar: '../../assets/chat/chat3.jpg',
        time: '12:07',
        message: 'Oh there are several other designs. Check all their designs on their website enappd.com',
        id: 5,
        status: 'done-all'
      }
    ];
    this.footerJson = [{
      'icon': 'images',
      'label': 'Image'
    }, {
      'icon': 'call',
      'label': 'Phone'
    }, {
      'icon': 'mail-unread',
      'label': 'Red'
    }, {
      'label': 'Document',
      'icon': 'radio-button-on'
    }, {
      'icon': 'pin',
      'label': 'Position'
    }, {
      'icon': 'videocam',
      'label': 'Video'
    }, ];
  }

  ngOnInit() {
  }
  typeSelected(type: any) {
    if (this.user_input === '' && type.icon === 'images') {
      this.msgList.push({
        userId: this.toUser,
        userName: this.toUser,
        time: '12:01',
        image: '../../assets/chat/chat3.jpg',
        id: this.msgList.length + 1,
        status: 'checkmark'
      });
      this.user_input = '';
      this.show = false;
      this.scrollDown();
      setTimeout(() => {
        this.senderSends();
      }, 500);
    } else if (this.user_input === '' && type.icon === 'videocam') {
      this.msgList.push({
        userId: this.toUser,
        userName: this.toUser,
        time: '12:01',
        video: '../../assets/chat/video.mp4',
        id: this.msgList.length + 1,
        status: 'checkmark'
      });
      this.user_input = '';
      this.show = false;
      this.scrollDown();
      setTimeout(() => {
        this.senderSends();
      }, 500);
    } else if (this.user_input === '' && type.icon === 'pin') {
      this.msgList.push({
        userId: this.toUser,
        userName: this.toUser,
        time: '12:01',
        map: { lat: 52.678418, lng: 7.809007 },
        id: this.msgList.length + 1,
        status: 'checkmark'

      });
      this.user_input = '';
      this.show = false;
      this.scrollDown();
      setTimeout(() => {
        this.senderSends();
      }, 500);
    }
  }

  toggleList(item: any) {
    this.show = !this.show;
    this.scrollDown();

  }
  sendMsg() {
    if (this.user_input !== '') {
      this.msgList.push({
        userId: this.toUser,
        userName: this.toUser,
        userAvatar: this.paramData.image ? this.paramData.image : '../../assets/chat/chat5.jpg',
        time: '12:01',
        message: this.user_input,
        id: this.msgList.length + 1,
        status: 'checkmark'

      });
      this.user_input = '';
      this.scrollDown();
      setTimeout(() => {
        this.senderSends();
      }, 500);
    }
    this.show = false;
  }
  senderSends() {
    this.loader = true;
    setTimeout(() => {
      this.msgList.push({
        userId: this.User,
        userName: this.User,
        userAvatar: '../../assets/chat/chat5.jpg',
        time: '12:01',
        message: 'Sorry, didn\'t get what you said. Can you repeat that please',
        status: 'checkmark',
        name: 'Diana Nicole'

      });
      this.loader = false;
      this.scrollDown();
    }, 2000);
    this.scrollDown();
  }
  scrollDown() {
    setTimeout(() => {
      this.content.scrollToBottom(50);
    }, 200);
  }
  something($event: any) {
    $event.preventDefault();
  }
  userTyping(event: any) {
    this.show = false;
    this.start_typing = event.target.value;
    this.scrollDown();
  }
  focusFunction(event: any) {
    this.show = false;
  }
  async popoverOpen(ev: any) {
    const popover = await this.popCtrl.create({
      component: ShareProfileComponent,
      translucent: true,
      event: ev,
      mode: 'md'
    });
    return await popover.present();
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
}

