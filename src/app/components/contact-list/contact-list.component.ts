import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})

export class ContactListComponent implements OnInit {

  // contactUniqueId: any;
  // contactFirstName: string[] = [];

  constructor(
    public dataService: DataService,
  ) {

  }

  ngOnInit(): void {
   
  }

  
  getFirstLetterFromContact(contact: any) {
    return contact.firstName.charAt(0);
  }

  editContact() {

    console.log('open contact edit');
  }
}
