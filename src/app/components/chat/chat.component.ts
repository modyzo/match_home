/** */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ChatStartComponent } from '../chat-start/chat-start.component';
import { DataService } from '@app/services/data.service';
import { environment } from '@env/environment';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  chatData: any;
  segmentTab: any;
  buttonClicked: boolean;
  clickData: any;
  imageData: any;
  activities = [];
  constructor(
    public route: Router,
    public modalCtrl: ModalController,
    public service: DataService,
    public apiService: ApiService
  ) {
    this.chatData = environment.chatData;
    this.clickData = environment.menuDropdown;
    this.imageData = environment.images;
  }

  ngOnInit() {
    this.apiService.getChats().subscribe((data: Array<any>) => {
      this.activities = data;
    });
  }
  changeClick() {
    this.buttonClicked = !this.buttonClicked;
  }
  changeSelected() {
    setTimeout(() => {
      this.buttonClicked = false;
    }, 500);
  }
  async goForChat(chat) {
    const modal = await this.modalCtrl.create({
      component: ChatStartComponent,
      componentProps: { value: chat },
    });
    return await modal.present();
  }
}
