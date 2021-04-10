/** */
import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { DataService } from '@app/services/data.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  feedData: any;
  constructor(public service: DataService, public apiService: ApiService) {
    this.feedData = environment.shareFeed;
  }

  ngOnInit() {
    this.apiService.getActivities().subscribe((activities) => {
      console.log('data activities', activities);
    });
  }
}
