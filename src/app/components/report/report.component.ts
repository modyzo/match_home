/** */
import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { ModalController } from '@ionic/angular';
import { environment } from '@env/environment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  reportData: any;
  constructor(public service: DataService, public modalCtrl: ModalController) {
    this.reportData = environment.report;
  }

  ngOnInit() {
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
}
