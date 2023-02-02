import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class DataService implements OnInit {

  taskId: any;
  id: string;
  allTasks = [];

  todos!: number;
  inProgress!: number;
  feedback!: number;
  done!: number;
  urgent!: number;
  deadline!: string;
  dayTime!: string;

  currentUser: any;

  allContacts = [];
  firstNames: string[] = this.allContacts.map(allContacts => allContacts.firstName);
  initialsFirstNames: string[] = [];


  loggedUser: string = '';

  userName: string;


  constructor(
    private firestore: AngularFirestore,
  ) {
    console.log('dataservice called');
    this.getLoggedUser();
    this.loadTasks();
    this.loadContacts();
    this.getDayTime();
    console.log(this.allTasks);
  }

  ngOnInit(): void {
  }

  // GET CURRENT DAY TIME
  getDayTime() {
    let today = new Date();
    let curHr = today.getHours();

    if (curHr < 12) {
      this.dayTime = 'Good morning';
    } else if (curHr < 18) {
      this.dayTime = 'Good afternoon'
    } else {
      this.dayTime = 'Good evening'
    }
  }

  // GET LOGGED USER
  getLoggedUser() {
    console.log(this.loggedUser);

    if (this.loggedUser) {
      this.userName = this.loggedUser;
      console.log(this.userName);
    } else {
      this.userName = 'Guest';
    }
  }

  // LOAD ALL TASKS FROM FIRESTORE
  loadTasks() {
    console.log('loading tasks called');
    this.firestore
      .collection('allTasks')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allTasks = changes;
        this.clear();
        this.count(this.allTasks);
      });
  }

  // RESET ALL NUMBERS BEFORE COUNT ALL TASKS
  clear() {
    this.todos = 0;
    this.inProgress = 0;
    this.feedback = 0;
    this.done = 0;
    this.urgent = 0;
  }

  // COUNT ALL.TASKS ON STATUS
  count(task: any) {
    task.forEach((task: any, index: any) => {
      this.getLowestDueDate(task, index);
      if (task.status == 'toDo') {
        this.todos++;
      };
      if (task.status == 'inProgress') {
        this.inProgress++;
      };
      if (task.status == 'awaitingFeedback') {
        this.feedback++;
      };
      if (task.status == 'done') {
        this.done++;
      };
      if (task.priority == 'Urgent') {
        this.urgent++;
      }
    })
  }

  getLowestDueDate(task: any, index: any) {
    if (index >= 0) {
      this.deadline = this.changeDateAppearance(new Date(task.dueDate));
    }
  }

  changeDateAppearance(date: any) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let day = date.getDate();
    let month = date.getMonth();
    month = months[month];
    let year = date.getFullYear();
    return month + ' ' + day + ', ' + year;
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

  }
// GET ALL FIRST NAMES OF CONTACT LIST
  getFirstNames() {
    let names = [];
    for (let contact of this.allContacts) {
      names.push(contact.firstName.charAt(0));
    }
    this.checkFirstLetters(names);
  }

  //CHECK FIRST LETTERS OF FIRST NAMES
  checkFirstLetters(names: any) {
    names.forEach((firstLetter: any[]) => {
      let initial = firstLetter[0];
      if (!this.initialsFirstNames.includes(initial)) {
        this.initialsFirstNames.push(initial);
      }
    });
  }
}