/** */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '@app/chat.service';
import { ApiService } from '@app/services/api.service';
import { IonContent, NavParams, ModalController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ShareProfileComponent } from '../share-profile/share-profile.component';
@Component({
  selector: 'app-chat-start',
  templateUrl: './chat-start.component.html',
  styleUrls: ['./chat-start.component.scss'],
  providers: [ChatService],
})
export class ChatStartComponent implements OnInit {
  @ViewChild('IonContent', { static: true }) content: IonContent;
  userDataDetails;
  subscriptions: Array<Subscription> = [];
  objectUrl;
  data: {}[];
  customPopoverOptions: any = {
    header: 'Hair Color',
    subHeader: 'Select your hair color',
    message: 'Only select your dominant hair color',
  };
  paramData: any;
  msgList = [];
  userName: any;
  user_input = '';
  User = 'Me';
  toUser = 'HealthBot';
  start_typing: any;
  loader: boolean;
  show: boolean;
  footerJson: { icon: string; label: string }[];

  constructor(
    public navParams: NavParams,
    public popCtrl: PopoverController,
    public modalCtrl: ModalController,
    public chatService: ChatService,
    public apiService: ApiService
  ) {
    this.paramData = this.navParams.get('value');

    this.joinToChanel(this.paramData.id);

    this.footerJson = [
      {
        icon: 'images',
        label: 'Image',
      },
      {
        icon: 'call',
        label: 'Phone',
      },
      {
        icon: 'mail-unread',
        label: 'Red',
      },
      {
        label: 'Document',
        icon: 'radio-button-on',
      },
      {
        icon: 'pin',
        label: 'Position',
      },
      {
        icon: 'videocam',
        label: 'Video',
      },
    ];
  }

  ngOnInit() {
    const subscriber = this.apiService.getProfile().subscribe(
      (data: any) => {
        this.userDataDetails = data;
      },
      (error) => {
        console.log('error', error);
      }
    );

    const chatSubscriber = this.chatService
      .getMessage()
      .subscribe((message) => {
        this.loader = true;

        setTimeout(() => {
          this.msgList.push(message);
          this.scrollDown();
          this.loader = false;
        }, 50);
      });
    const messageSubscriber = this.chatService
      .getMessages()
      .subscribe((data: Array<any>) => {
        this.msgList = data;
      });
    this.subscriptions.push(subscriber, chatSubscriber);
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  joinToChanel(id: string) {
    const subscription = this.chatService.joinToChannel(id);
    this.subscriptions.push(subscription);
  }

  toggleList(item: any) {
    this.show = !this.show;
    this.scrollDown();
  }

  sendMsg() {
    if (this.user_input !== '') {
      this.chatService.sendMessage(
        this.user_input,
        this.paramData.id,
        this.userDataDetails.id
      );

      this.user_input = '';
      this.scrollDown();
    }
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
      mode: 'md',
    });
    return await popover.present();
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
}
