import { Injectable, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.class';
import { ActivatedRoute, RouterState } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService implements OnInit {

  taskId: any;
  // contactList: Contact[] = [];
  id: string;


  public allTasks$: Observable<any>;

  allTasks = [];
  allContacts = [];

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
  ) {
    console.log('dataservice called');
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
        console.log(this.allTasks);
      });
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



  getRouteParamsOfTasks() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('route params:', this.id);
    this.route.paramMap.subscribe(paramMap => {
      this.taskId = paramMap.get('id');

      console.log('the task id is', this.taskId);
    });
  }
}