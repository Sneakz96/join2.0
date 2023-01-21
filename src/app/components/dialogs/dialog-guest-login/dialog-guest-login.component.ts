import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-guest-login',
  templateUrl: './dialog-guest-login.component.html',
  styleUrls: ['./dialog-guest-login.component.scss']
})
export class DialogGuestLoginComponent {

  constructor(
    public router: Router,
    public dialogRef: MatDialogRef<any>) { }

  openUrl() {
    this.router.navigateByUrl('/kanbanboard/summary');
    // const dialogRef = this.dialog.close();
    this.closeDialog();
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
