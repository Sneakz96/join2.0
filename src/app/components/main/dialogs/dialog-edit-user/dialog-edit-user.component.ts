import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact.class';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})

export class DialogEditUserComponent {

  user: Contact;
  userId: string;

  // 
  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    public data: DataService,
  ) { }

  // CLOSE DIALOG
  closeDialog() {
    this.dialogRef.close();
  }
}