import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogAddTaskComponent } from '../components/main/dialogs/dialog-add-task/dialog-add-task.component';
import { DialogAddUserComponent } from '../components/main/dialogs/dialog-add-user/dialog-add-user.component';
import { Task } from '../models/task.class';

@Injectable({
  providedIn: 'root'
})

export class DataService implements OnInit {
  // ALERTS
  alert = false;
  taskCreated = true;
  contactCreated = false;
  // TASKS
  newTask = new Task();
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
  // CONTACTS
  allContacts = [];
  allContacts$: Observable<any>;
  firstNames: string[] = this.allContacts.map(allContacts => allContacts.firstName);
  initialsFirstNames: string[] = [];
  // USERNAME
  userName: string = 'Guest';

  // 
  constructor(
    private fire: Firestore,
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    public dialogAdd: MatDialogRef<DialogAddTaskComponent>,
  ) {
    this.getDayTime();
    this.loadTasks();
    this.loadContacts();
    this.loadContactListInAddTask();
  }

  // 
  ngOnInit(): void { }

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

  // SET TASK ID
  setId() {
    var id = new Date().getTime();
    this.newTask.id = id / 1000000000;
  }

  // SET CREATION TIME
  setDate() {
    var date = new Date().getTime();
    this.newTask.createdAt = date;
  }

  // LOG PRIORITY
  setPrio(prio: string) {
    this.newTask.priority = prio;
    console.log(this.newTask.priority)
  }

  // SAVE TASKS TO DB
  saveTaskToFirestore() {
    const coll = collection(this.fire, 'allTasks');
    setDoc(doc(coll), this.newTask.toJSON());
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

  // GET LOWEST DUEDATE OF ALL TASKS
  getLowestDueDate(task: any, index: any) {
    if (index >= 0) {
      this.deadline = this.changeDateAppearance(new Date(task.dueDate));
    }
  }

  // CHANGE DATE APPEARANCE
  changeDateAppearance(date: any) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let day = date.getDate();
    let month = date.getMonth();
    month = months[month];
    let year = date.getFullYear();
    return month + ' ' + day + ', ' + year;
  }

  // LOAD ALL CONTACTS FROM FIRESTORE
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

  // SORT CONTACTS ON ALPHABET
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

  // LOAD CONTACTS IN OBSERVABLE FOR ADD TASK (ASSIGNED)
  loadContactListInAddTask() {
    const coll = collection(this.fire, 'allContacts');
    this.allContacts$ = collectionData(coll);
    this.allContacts$.subscribe(() => {
      console.log(this.allContacts$);
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

  // CHECK FIRST LETTERS OF FIRST NAMES
  checkFirstLetters(names: any) {
    names.forEach((firstLetter: any[]) => {
      let initial = firstLetter[0];
      if (!this.initialsFirstNames.includes(initial)) {
        this.initialsFirstNames.push(initial);
      }
    });
  }

  // OPEN ADD_CONTACT_OVERLAY
  addNewContact() {
    this.dialog.open(DialogAddUserComponent);
  }

  // EXIT ADD TASK DIALOG
  close() {
    this.dialogAdd.close(DialogAddTaskComponent);
  }
}