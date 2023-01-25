import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.class';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})

export class ContactListComponent implements OnInit {

  allContacts$: Observable<any>;
  contactUniqueId: any;
  allContacts = [];

  constructor(
    private firestore: AngularFirestore,
    public dataService: DataService,
  ) {

  }

  ngOnInit(): void {
    this.loadContacts();

  }

  loadContacts() {
    this.firestore
      .collection('allContacts')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        console.log('fs:', changes);
        this.allContacts = changes;
        console.log(this.allContacts);
      });
    this.sortContacts();
  }

  sortContacts() {
    console.log('sort contacts');
    this.allContacts.sort((a, b) => a.firstName.localeCompare(b.firstName))
  }

  editContact() {

    console.log('open contact edit');
  }
}
