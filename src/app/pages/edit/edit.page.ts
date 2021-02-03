/** */
import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  data: any;
  imageData: any;

  constructor(public serviceProvider: DataService) {
    this.data = environment.editInfo;
    this.imageData = environment.images;
  }

  ngOnInit() {
  }

}
