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
import { TinderIconsComponent } from '@app/components/tinder-icons/tinder-icons.component';
import { environment } from '@env/environment';
import { ApiService } from '@app/services/api.service';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  filterTerm: string;
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

  segmentButton: any = 'flame';
  userDetail: { userDetails: string }[];
  cards: Array<any>;
  stackConfig: StackConfig;
  recentCard = '';
  slidesImg: { image: string }[];
  footerIcon: any[];
  subSegmentButton = 'messages';
  modalData: any;
  modalStarData: any;
  modalFlashData: any;
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
    private apiService: ApiService
  ) {
    this.data = environment.tabs;
    this.userDetail = environment.details;
    this.cards = [];
    this.footerIcon = environment.footer_icons;
    this.modalStarData = environment.star;
    this.modalFlashData = environment.flash;
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
  }

  private getCards() {
    this.apiService.getList({}).subscribe(
      (res) => {
        this.cards = res.estates;
        console.log(this.cards);
        this.hasUserData = true;
      },
      (error) => console.log(error)
    );
  }

  clickedIconIs(icon) {
    if (icon === 'refresh') {
      this.dataService.openModal(TinderIconsComponent, this.modalRefreshData);
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
    } else if (icon === 'heart') {
      this.like = true;
      setTimeout(() => {
        this.like = false;
        this.cards.pop();
      }, 200);
    } else if (icon === 'star') {
      this.dataService.openModal(
        TinderIconsComponent,
        this.modalStarData,
        'modalBackground'
      );
    } else if (icon === 'flash') {
      this.dataService.openModal(
        TinderIconsComponent,
        this.modalFlashData,
        'modalBackground'
      );
    } else if (icon === 'star') {
      this.dataService.openModal(
        TinderIconsComponent,
        this.modalStarData,
        'modalBackground'
      );
    }
  }

  updateImage(i) { }
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
    this.dataService.openRxModal(
      'filter',
      this.filterFields,
      true,
      '',
      true
    ).pipe(
      mergeMap((modalRes) => {
        if (modalRes.data) {
          const data = modalRes.data;
          const requestBody = {
            PriceRange: {
              Min: data.price.lower,
              Max: data.price.upper
            },
            AvailabilityIds: data.availability,
            AreaRange: {
              Min: data.square.lower,
              Max: data.square.upper
            },
            MinRooms: data.rooms.lower,
            MaxRooms: data.rooms.upper,
            EstateIds: data.stateOfBuild,
            BathRooms: data.bathroom,
            Garage: data.garage
          };

          this.filterFields = data;
          return this.apiService.getList({ Filter: requestBody })
        } else {
          return of(null);
        }
      })
    ).subscribe(
      (res) => {
        console.log(res);
        this.hasUserData = true;
        if (res && res.estates && res.estates.length) {
          this.cards = res.estates;
        } else if (res.isValidRequest) {
          this.cards = [];
        }
      }
    );
  }
}
