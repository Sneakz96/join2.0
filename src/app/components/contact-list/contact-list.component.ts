import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.class';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})

export class ContactListComponent implements OnInit {

  allContacts: Contact[] = this.dataService.contactList;

  constructor(
    public dataService: DataService,
  ) {
    this.getAllContacts();
    
  }

  ngOnInit(): void {
  }

  getAllContacts() {
    //LOAD CONTACTS FROM FIRESTORE IN ARRAY 
    // this.allContacts.push(this.testContact1, this.testContact2, this.testContact3);
    console.log(this.allContacts);
  }
}
