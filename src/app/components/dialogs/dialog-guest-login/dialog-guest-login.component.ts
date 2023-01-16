import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-guest-login',
  templateUrl: './dialog-guest-login.component.html',
  styleUrls: ['./dialog-guest-login.component.scss']
})
export class DialogGuestLoginComponent  {

  constructor(public router: Router) { }

  openUrl() {
    this.router.navigateByUrl('/summary');
  }
}
