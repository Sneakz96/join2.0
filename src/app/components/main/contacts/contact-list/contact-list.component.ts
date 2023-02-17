import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.class';
import { DataService } from 'src/app/services/data.service';
import { DialogAddUserComponent } from '../../dialogs/dialog-add-user/dialog-add-user.component';
import { DialogEditUserComponent } from '../../dialogs/dialog-edit-user/dialog-edit-user.component';
import { EditContactComponent } from 'src/app/components/main/contacts/edit-contact/edit-contact.component';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})

export class ContactListComponent implements OnInit {

  constructor(
    public dataService: DataService,
    public dialog: MatDialog,
    private router: Router,
    private edit: EditContactComponent,
  ) { }

  ngOnInit(): void {
    // this.edit.getParams();

  }

  // GET CHAR.AT(0) ON FIRST NAME OF CONTACT
  getFirstLetterFromContact(contact: any) {
    return contact.firstName.charAt(0);
  }

  // OPEN ADD NEW USER OVERLAY
  addNewContact() {
    // this.router.navigate(['/kanbanboard/contacts/add-user']);

    // OPEN DIALOG
    this.dialog.open(DialogAddUserComponent);
  }

  open(userToOpen: any) {
    if (this.dataService.mbDevice == null) {
      console.log('open site', userToOpen);
    } else {
      console.log('open dialog');
      const dialogRef = this.dialog.open(DialogEditUserComponent);
      dialogRef.componentInstance.user = userToOpen;
      dialogRef.componentInstance.userId = this.edit.userId;
    }
  }
}
