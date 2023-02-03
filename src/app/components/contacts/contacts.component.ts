import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit {

  contact = new Contact();

  constructor(
    public dialog: MatDialog,
    private router: Router,
    ) { 

    }


  ngOnInit(): void {
  }

// 
  addNewContact() {
    this.router.navigate(['/kanbanboard/contacts/add-user'])
  }

}
