import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact.class';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit {

  contact = new Contact();

  constructor(
    public dialog: MatDialog,
    public data: DataService,
  ) { }

  ngOnInit(): void { }
}