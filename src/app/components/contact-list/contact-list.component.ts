import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Contact } from 'src/app/models/contact.class';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})

export class ContactListComponent implements OnInit {

  contactUniqueId: any;
   allContacts = this.dataService.allContacts;

  constructor(
    private firestore: AngularFirestore,
    public dataService: DataService,
  ) {

  }

  ngOnInit(): void {
    this.loadContacts();
  }

  //LOAD CONTACTS FROM FIRESTORE
  loadContacts() {
    this.firestore
      .collection('allContacts')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        console.log('fs:', changes);
        this.allContacts = changes;
        console.log(this.allContacts);
        this.sortContacts();
      });
  }

  //SORT CONTACTS ON ALPHABET
  sortContacts() {
    this.allContacts.sort((a, b) => {
      if (a.firstName < b.firstName) {
        return -1;
      }
      if (a.firstName > b.firstName) {
        return 1;
      }
      return 0;
    });
    console.log(this.allContacts);
  }




  editContact() {

    console.log('open contact edit');
  }
}
