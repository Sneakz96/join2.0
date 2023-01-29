import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})

export class ContactListComponent implements OnInit {

  contactUniqueId: any;
  contactFirstName: string[] = [];
  db = '';

  constructor(
    private firestore: AngularFirestore,
    public dataService: DataService,
  ) {

  }

  ngOnInit(): void {
   
  }

  // firstNames: string[] = this.allContacts.map(function(allContacts){
  //   return allContacts.firstName;
  // });


  editContact() {

    console.log('open contact edit');
  }
}
