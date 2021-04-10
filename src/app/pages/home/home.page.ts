import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonSlides, IonContent } from '@ionic/angular';
import { DataService } from '@app/services/data.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import {
  SwingCardDirective,
  SwingStackDirective,
  Direction,
  ThrowEvent,
  DragEvent,
  StackConfig,
} from '../../ionic-swing/ionic-swing.module';
import { MatchIconsComponent } from '@app/components/match-icons/match-icons.component';
import { environment } from '@env/environment';
import { ApiService } from '@app/services/api.service';
import { mergeMap, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { LoadingService } from '@app/shared/services/loading.service';
import { LocalNotificationService } from '@app/shared/services/local-notification.service';
import { serialize } from '@app/shared/helprers/serialize-helper';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  filterTerm: string;
  driveLink = environment.driveLink;
  userRecords = [
    {
      id: 1,
      name: 'House',
    },
    {
      id: 2,
      name: 'Apartaments',
    },
  ];

  @ViewChild('IonContent', { static: true }) content: IonContent;
  @ViewChild('Slides', { static: true }) slides: IonSlides;
  @ViewChild('swingStack', { static: true, read: SwingStackDirective })
  swingStack: SwingStackDirective;
  @ViewChildren('swingCards', { read: SwingCardDirective })
  swingCards: QueryList<SwingCardDirective>;
  slideOpts = {
    effect: 'flip',
    direction: 'horizontal',
    autoplay: {
      delay: 2000,
    },
  };
  segment = '';
  index = 0;
  data: Array<any> = [];

  segmentButton: any = 'home';
  userDetail: { userDetails: string }[];
  cards: Array<any> = [];
  stackConfig: StackConfig;
  recentCard = '';
  slidesImg: { image: string }[];
  footerIcon: any[];
  subSegmentButton = 'messages';
  modalData: any;
  modalStarData: any;
  modalRocketData: any;
  modalRefreshData: any;
  showButton: boolean;
  modalGold: any;
  hasUserData = false;
  conversation = environment.conversation;
  phone_model = 'iPhone';
  input = '';
  like: boolean;
  disLike: boolean;
  superLike: boolean;
  nope: boolean;
  clicked: any;
  public filterFields: any;

  constructor(
    public dataService: DataService,
    public route: Router,
    public alertController: AlertController,
    private apiService: ApiService,
    private loadingService: LoadingService,
    private localNotificationService: LocalNotificationService
  ) {
    this.data = [
      { title: 'person' },
      { title: 'home' },
      { title: 'chatbubbles' },
    ];
    this.userDetail = environment.details;
    this.cards = [];
    this.footerIcon = environment.footer_icons;
    this.modalStarData = environment.star;
    this.modalRocketData = environment.rocket;
    this.modalRefreshData = environment.refresh;
    this.modalGold = environment.gold;
    this.showButton = true;
    this.like = false;
    this.disLike = false;
    this.superLike = false;
    this.clicked = true;
    this.hasUserData = false;
    this.stackConfig = {
      allowedDirections: [
        Direction.UP,
        Direction.DOWN,
        Direction.LEFT,
        Direction.RIGHT,
      ],
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(
          Math.max(
            Math.abs(offsetX) / (element.offsetWidth / 1.7),
            Math.abs(offsetY) / (element.offsetHeight / 2)
          ),
          1
        );
      },

      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      },
    };
    this.getCards();
    this.getUserProfile();
  }

  private getUserProfile() {
    this.apiService.getProfile().subscribe(
      (data: any) => {
        if (data.isAgentApproved) {
          this.data.push({ title: 'add-circle' });
        }
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  private getCards() {
    this.loadingService.startLoading(this.getCardsRequest()).subscribe(
      (res: any) => {
        this.cards = res;
        this.hasUserData = true;
      },
      (error) => console.log(error)
    );
  }

  private getCardsRequest() {
    return this.apiService.getProperties({ hasPictures: true });
  }

  clickedIconIs(icon, id: string, image: string) {
    console.log('id', id);
    if (icon === 'refresh') {
      this.dataService.openModal(MatchIconsComponent, this.modalRefreshData);
    } else if (icon === 'close') {
      this.disLike = true;
      setTimeout(() => {
        this.disLike = false;
        this.cards.pop();
      }, 200);
    } else if (icon === 'star') {
      this.superLike = true;
      setTimeout(() => {
        this.superLike = false;
        this.cards.pop();
      }, 200);
    } else if (icon === 'home') {
      this.apiService.addReaction(id, 'like').subscribe(() => {
        this.showSeaprator(
          () => {
            this.like = true;
            setTimeout(() => {
              this.like = false;
              this.cards.pop();
            }, 200);
          },
          id,
          image
        );
      });
      // this.like = true;
      // setTimeout(() => {
      //   this.like = false;
      //   this.cards.pop();
      // }, 200);
    } else if (icon === 'star') {
      this.dataService.openModal(
        MatchIconsComponent,
        this.modalStarData,
        'modalBackground'
      );
    } else if (icon === 'rocket') {
      this.localNotificationService.showNotification(
        'This feature is coming soon',
        'info-main'
      );
      // this.dataService.openModal(
      //   MatchIconsComponent,
      //   this.modalRocketData,
      //   'modalBackground'
      // );
    } else if (icon === 'star') {
      this.dataService.openModal(
        MatchIconsComponent,
        this.modalStarData,
        'modalBackground'
      );
    }
  }

  public showSeaprator(callback: () => void, id: string, image: string) {
    this.dataService
      .openRxModal('separator', { id, image }, false, 'modal-fullscreen', false)
      .pipe(
        mergeMap((modalRes) => {
          return this.apiService.requestPropertyInfo(id, modalRes.data.request);
        })
      )
      .subscribe((modalRes) => {
        callback();
      });
  }

  updateImage(i) {}
  onItemMove(element, x, y, r) {
    const color = '';
    const abs = Math.abs(x);
    const min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    const hexCode = this.decimalToHex(min, 2);
    element.style[
      'transform'
    ] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  voteUp(like: boolean) {
    const removedCard = this.cards.pop();
    this.addNewCards(1);
    if (like) {
      this.recentCard = 'You liked: ' + removedCard.name;
    } else {
      this.recentCard = 'You disliked: ' + removedCard.name;
    }
  }

  addNewCards(count: number) {
    // this.cards.push(this.recentCard);
  }

  decimalToHex(d, padding) {
    let hex = Number(d).toString(16);
    padding =
      typeof padding === 'undefined' || padding === null
        ? (padding = 2)
        : padding;

    while (hex.length < padding) {
      hex = '0' + hex;
    }

    return hex;
  }

  segmentChanged(event: any) {
    this.segmentButton = event.detail.value;
  }
  openAndHideDetail(userData: any) {
    this.route.navigate([
      'profile-details',
      { userData: JSON.stringify(userData) },
    ]);
    console.log(userData);
  }

  async change() {
    await this.slides.getActiveIndex().then((data) => (this.index = data));
    if (this.index === 0) {
      this.showButton = true;
    } else if (this.index !== 0) {
      this.showButton = false;
    }
  }

  onDragMove(event: DragEvent) {
    if (event.offset > 5 || event.throwDirection === 'Symbol(RIGHT)') {
      this.like = true;
      this.disLike = false;
      this.superLike = false;
    } else if (event.offset < -5 || event.throwDirection === 'Symbol(LEFT)') {
      this.like = false;
      this.disLike = true;
      this.superLike = false;
    } else if (event.offset > 0 || event.throwDirection === 'Symbol(UP)') {
      this.like = false;
      this.disLike = false;
      this.superLike = true;
    }
  }
  onDragEnd(event: DragEvent) {
    this.like = false;
    this.disLike = false;
    this.superLike = false;
  }

  segmentButtonClicked(event: any) {
    this.subSegmentButton = event.detail.value;
  }
  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  onThrowOut(event: ThrowEvent) {
    if (this.superLike) {
      const removedCard = this.cards.pop();
      this.addNewCards(1);
      this.recentCard = 'You superliked: ' + removedCard.name;
    }
    if (this.like) {
      const id = this.cards[0].id;
      const image = this.cards[0].pictures[0];
      this.apiService.addReaction(id, 'like').subscribe(() => {
        this.showSeaprator(
          () => {
            setTimeout(() => {}, 200);
          },
          id,
          image
        );
      });
    }
  }

  send() {
    if (this.input !== '') {
      this.conversation.push({
        text: this.input,
        sender: 1,
        image: 'assets/images/sg1.jpg',
      });
      this.input = '';
      setTimeout(() => {
        this.content.scrollToBottom(50);
      }, 200);
    }
  }

  something($event: any) {
    $event.preventDefault();
  }

  public showFilter() {
    this.dataService
      .openRxModal('filter', this.filterFields, true, '', true)
      .subscribe((modalRes) => {
        if (modalRes.data) {
          this.hasUserData = false;
          this.applyFilter(modalRes.data);
        }
      });
  }

  private applyFilter(data) {
    this.loadingService
      .startLoading(this.applyFilterRequest(data))
      .subscribe((res: any) => {
        this.hasUserData = true;
        if (res && res.estates && res.estates.length) {
          this.cards = res;
        }
      });
  }

  private applyFilterRequest(data) {
    const requestBody = {
      price: {
        min: data.price.lower,
        max: data.price.upper,
      },
      availability: data.availability,
      area: {
        min: data.square.lower,
        max: data.square.upper,
      },
      rooms: {
        min: data.rooms.lower,
        max: data.rooms.upper,
      },
      bathRooms: {
        min: data.bathroom.lower,
        max: data.bathroom.upper,
      },
      garage: {
        min: data.garage.lower,
        max: data.garage.upper,
      },
      hasPictures: true,
      kitchen: {
        min: data.kitchen.lower,
        max: data.kitchen.upper,
      },
    };

    if (data.availability) {
      requestBody.availability = data.availability;
    } else {
      delete requestBody.availability;
    }

    this.filterFields = data;
    return this.apiService.getProperties(requestBody);
  }
}
