import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { DialogAddUserComponent } from '../../dialogs/dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})

export class ContactListComponent {

  constructor(
    public dataService: DataService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

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
}
