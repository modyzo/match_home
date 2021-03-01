import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationService {

  constructor(
    private toastr: ToastrService,
  ) { }

  public showNotification(message: string, status, title?: string) {
    const toastrConfig = {
      timeOut: 5000
    };
    this.toastr.show(message, title, toastrConfig, status);
  }
}
