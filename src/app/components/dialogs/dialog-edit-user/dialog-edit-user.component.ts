import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  user: Contact;

  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>
  ) { }


  ngOnInit(): void {
    console.log(this.user);
  }

  // CLOSE DIALOG
  closeDialog() {
    this.dialogRef.close();
  }

  // SAVE EDITED TASK TO DB
  save() {
    console.log('save called');
    this.closeDialog();
  }
}
