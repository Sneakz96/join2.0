import { Injectable, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.class';
import { ActivatedRoute, RouterState } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first, Observable } from 'rxjs';
import { DialogGuestLoginComponent } from '../components/dialogs/dialog-guest-login/dialog-guest-login.component';

@Injectable({
  providedIn: 'root'
})

export class DataService implements OnInit {

  taskId: any;
  id: string;
  allTasks = [];

  allContacts = [];
  firstNames: string[] = this.allContacts.map(allContacts => allContacts.firstName);
  initialsFirstNames: string[] = [];


  loggedUser: string[] = [];
  userName: string;




  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    public guestUser: DialogGuestLoginComponent,
  ) {
    console.log('dataservice called');
    this.getLoggedUser();
    this.loadTasks();
    this.loadContacts();
  }

  ngOnInit(): void {

  }

  //GET LOGGED USER
  getLoggedUser() {
    console.log(this.guestUser.displayName);
    
    if (this.guestUser.displayName) {
      this.userName = this.guestUser.displayName;
    } else {
      this.userName = 'Guest';
      console.log(this.userName);
    }
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