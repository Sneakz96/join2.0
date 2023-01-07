import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from 'src/app/services/dialog-add-user/dialog-add-user.component'
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

  @Output() featureSelect = new EventEmitter<string>();

  onSelect(feature: string) {
    this.featureSelect.emit(feature);
    console.log(feature);
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
