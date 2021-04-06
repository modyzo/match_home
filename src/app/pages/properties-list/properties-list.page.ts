/** */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '@app/services/api.service';
import { DataService } from '@app/services/data.service';

import { LocalNotificationService } from '@app/shared/services/local-notification.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.page.html',
  styleUrls: ['./properties-list.page.scss'],
})
export class PropertiesListPage {
  private propertiesList = [];

  constructor(
    public serviceProvider: DataService,
    public route: Router,
    private apiService: ApiService,
    private localNotificationService: LocalNotificationService,
    private activeRouter: ActivatedRoute
  ) {
    this.activeRouter.params
      .pipe(
        mergeMap((params) => {
          return this.apiService.getMyProperties();
        })
      )
      .subscribe((data: any) => {
        this.propertiesList = data;
      });
  }

  changeSelected() {
    console.log('here');
  }

  remove(id: string) {
    this.apiService
      .removeProperties(id)
      .pipe(
        mergeMap((id: string) => {
          return this.apiService.getMyProperties();
        })
      )
      .subscribe(
        (data: any) => {
          this.propertiesList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  edit(id: string) {
    this.route.navigate([`edit-properties/${id}`]);
  }

  upload(id: string) {
    this.route.navigate([`upload-properties/${id}`]);
  }

  addProperties() {
    this.route.navigate([`add-properties`]);
  }
}
