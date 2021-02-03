/** */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.page.html',
  styleUrls: ['./delete-account.page.scss'],
})
export class DeleteAccountPage implements OnInit {

  constructor(public route: Router) { }

  ngOnInit() {
  }
  goToDeleteConfirm() {
    this.route.navigate(['delete-confirm']);
  }
}
