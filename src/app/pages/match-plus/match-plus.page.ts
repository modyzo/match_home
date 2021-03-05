/** */
import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-match-plus',
  templateUrl: './match-plus.page.html',
  styleUrls: ['./match-plus.page.scss'],
})
export class MatchPlusPage implements OnInit {
  matchPlusData: any;
  constructor(public serviceProvider: DataService) {
    this.matchPlusData = environment.matchPlus;
  }

  ngOnInit() {}
}
