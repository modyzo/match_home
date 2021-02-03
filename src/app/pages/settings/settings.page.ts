/** */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@app/services/data.service';
import { TermsComponent } from '@app/components/terms/terms.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  clicked: boolean;
  rangeSingle = 10;
  rangeDualKnobs = { lower: 18, upper: 52 };
  click: any;
  constructor(public route: Router, public service: DataService) {
    this.clicked = false;
  }

  ngOnInit() {
  }
  showNewLocation() {
    this.clicked = true;
  }
  goToPage(page) {
    this.route.navigate([page]);
  }
  changeColor(value) {
    if (value === 'km') {
      this.click = true;
    } else if (value === 'Mi') {
      this.click = true;
    }

  }

  gotoLegal() {
    this.service.openModal(TermsComponent, '');
  }
  gotoFunctions() { }
}
