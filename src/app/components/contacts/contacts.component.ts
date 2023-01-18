import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from 'src/app/components/dialogs/dialog-add-user/dialog-add-user.component'
import { Contact } from 'src/app/models/contact.class';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit {

  contact = new Contact();
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  @Output() sideSelect = new EventEmitter<string>();

  onSelect(feature: string) {
    this.sideSelect.emit(feature);
    console.log('should display', feature);
    console.log(this.sideSelect, feature);
  }

  // openDialog() {
  //   this.dialog.open(DialogAddUserComponent);
  // }
}
