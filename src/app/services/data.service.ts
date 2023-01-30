import { Injectable, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.class';
import { ActivatedRoute, RouterState } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService implements OnInit {

  taskId: any;
  // contactList: Contact[] = [];
  id: string;


  allTasks = [];

  allContacts = [];
  firstNames: string[] = this.allContacts.map(allContacts => allContacts.firstName);
  initialsFirstNames: string[] = [];

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
  ) {
    // console.log('dataservice called');
    this.loadContacts();
    this.loadTasks();
  }

  ngOnInit(): void {

  }



  //LOAD ALL TASKS FROM FIRESTORE
  loadTasks() {
    this.firestore
      .collection('allTasks')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allTasks = changes;
        // console.log(this.allTasks);
      });
  }



  //LOAD CONTACTS FROM FIRESTORE
  loadContacts() {
    this.firestore
      .collection('allContacts')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allContacts = changes;
        this.sortContacts();
        this.getFirstNames();
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
    // console.log(this.allContacts);
  }


  getFirstNames() {
    let names = [];
    for (let contact of this.allContacts) {
      names.push(contact.firstName.charAt(0));
    }
    this.checkFirstLetters(names);
  }


  //CHECK FIRST LETTERS
  checkFirstLetters(names: any) {
    console.log(names);

    names.forEach((firstLetter: any[]) => {
      let initial = firstLetter[0];
      if (!this.initialsFirstNames.includes(initial)) {
        this.initialsFirstNames.push(initial);
      }
      console.log(this.initialsFirstNames);
    })

  }

  getFirstLetterFromContact(contact: string) {
    return contact.charAt(0);
  }











  getRouteParamsOfTasks() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('route params:', this.id);
    this.route.paramMap.subscribe(paramMap => {
      this.taskId = paramMap.get('id');

      console.log('the task id is', this.taskId);
    });
  }
}