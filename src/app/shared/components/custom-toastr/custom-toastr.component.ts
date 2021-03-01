import { Component } from '@angular/core';
import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';
import { trigger, style, keyframes, transition, state, animate } from '@angular/animations';

@Component({
  selector: 'app-custom-toastr',
  templateUrl: './custom-toastr.component.html',
  styleUrls: ['./custom-toastr.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        transform: 'translate3d(0, 100%, 0)',
        opacity: 0
      })),
      transition('inactive => active', animate('350ms ease-out', keyframes([
        style({
          transform: 'translate3d(0, 0, 0)',
          opacity: 1,
        })
      ]))),
      transition('active => removed', animate('350ms ease-out', keyframes([
        style({
          opacity: 1,
        }),
        style({
          transform: 'translate3d(0, 100%, 0)',
          opacity: 0,
        }),
      ]))),
    ]),
  ],
  preserveWhitespaces: false,
})
export class CustomToastrComponent extends Toast {

  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage,
  ) {
    super(toastrService, toastPackage);
  }

}
