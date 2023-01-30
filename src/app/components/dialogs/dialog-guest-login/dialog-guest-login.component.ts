import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dialog-guest-login',
  templateUrl: './dialog-guest-login.component.html',
  styleUrls: ['./dialog-guest-login.component.scss']
})
export class DialogGuestLoginComponent {

  public displayName: string;

  constructor(
    public data: DataService,
    public router: Router,
    public dialogRef: MatDialogRef<any>) { }

  openUrl() {
    this.router.navigateByUrl('/kanbanboard/summary');
    // const dialogRef = this.dialog.close();
    this.closeDialog();
    this.displayName = this.data.loggedUser;
    console.log(this.displayName);
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
