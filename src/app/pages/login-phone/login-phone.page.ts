
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login-phone',
  templateUrl: './login-phone.page.html',
  styleUrls: ['./login-phone.page.scss'],
})
export class LoginPhonePage implements OnInit {
  collectionName = 'phoneLogin';
  customPopoverOptions: any = {
  };
  data: { 'name': string; 'dial_code': string; 'code': string; }[];
  selectedValue: any = '';
  inputValue: any = '';
  phoneNumber: any;
  constructor(public route: Router, private firestore: AngularFirestore) {
    this.data = environment.COUNTRY_DATA;
  }


  ngOnInit() {
  }
  gotVerification(input: any, selected: any) {
    this.phoneNumber = selected + input;
    this.route.navigate(['login-phone-verification', { selected, input }]);
  }
}
