/** */
import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.page.html',
  styleUrls: ['./delete-confirm.page.scss'],
})
export class DeleteConfirmPage implements OnInit {
  deleteData: any;
  constructor(public service: DataService) {
    this.deleteData = environment.deleteAccount;
  }

  ngOnInit() {
  }
  goForModalReason(item: any, index) {
  }
}
