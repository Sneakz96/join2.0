import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { DialogAddUserComponent } from '../../dialogs/dialog-add-user/dialog-add-user.component';
import { DialogEditUserComponent } from '../../dialogs/dialog-edit-user/dialog-edit-user.component';
import { EditContactComponent } from 'src/app/components/main/contacts/edit-contact/edit-contact.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})

export class ContactListComponent {

  constructor(
    public data: DataService,
    public dialog: MatDialog,
    private edit: EditContactComponent,
  ) { }

  // GET CHAR.AT(0) ON FIRST NAME OF CONTACT
  getFirstLetterFromContact(contact: any) {
    return contact.firstName.charAt(0);
  }

  // OPEN ADD NEW USER OVERLAY
  addNewContact() {
    this.dialog.open(DialogAddUserComponent);
  }

  // CHECK MB DEVICE - WHAT TO OPEN
  open(userToOpen: any) {
    if (this.data.mbDevice == null) {
    } else {
      let dialogRef = this.dialog.open(DialogEditUserComponent);
      dialogRef.componentInstance.user = userToOpen;
      dialogRef.componentInstance.userId = this.edit.userId;
    }
  }
}
