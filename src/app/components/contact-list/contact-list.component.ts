import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
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

  constructor(
    firestore: Firestore,
    public dataService: DataService,
  ) {
    const coll = collection(firestore, 'allContacts');
    this.allContacts$ = collectionData(coll);
    this.allContacts$.subscribe(()=>{
      // console.log(this.allContacts$);
    });
  }

  ngOnInit(): void {
    
  }
  sortContacts() {
    // this.contactList.sort((a, b) => a.firstName.localeCompare(b.firstName))
  }
}
