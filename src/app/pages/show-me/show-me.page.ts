/** */
import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { MatchComponent } from '@app/components/match/match.component';

@Component({
  selector: 'app-show-me',
  templateUrl: './show-me.page.html',
  styleUrls: ['./show-me.page.scss'],
})
export class ShowMePage implements OnInit {

  constructor(public service: DataService) { }

  ngOnInit() {
  }
  gotoMatch() {
    this.service.openModal(MatchComponent, '');
  }
}
