import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
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
  category = false;
  assigned = false;
  dueDate = false;
  prio = false;
  subError = false;
  // TASKS
  task = new Task();
  taskForm!: FormGroup;
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
  today: Date;
  // CONTACTS
  allContacts = [];
  allContacts$: Observable<any>;
  firstNames: string[] = this.allContacts.map(allContacts => allContacts.firstName);
  initialsFirstNames: string[] = [];
  // USERNAME
  userName: string = 'Guest';
  // BOARD
  // task: any;

  mbDevice = null;
  low = false;
  medium = false;
  high = false;

  // 
  constructor(
    private fire: Firestore,
    private firestore: AngularFirestore,
    public dialog: MatDialog,
  ) {
    this.getDayTime();
    this.loadTasks();
    this.loadContacts();
    this.loadContactListInAddTask();
    // this.setForm();
  }

  // 
  ngOnInit(): void {
  }

  // GET CURRENT DAY TIME
  getDayTime() {
    let day = new Date();
    day.getDate();
    this.today = day;
    let curHr = day.getHours();
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
    this.firestore
      .collection('allTasks')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allTasks = changes;
        this.clear();
        this.count(this.allTasks);
      });
  }

  // 
  getCategoryColor(category: string): any {
    switch (category) {
      case 'Management':
        return 'management';
      case 'Costumer Service':
        return 'customer-service';
      case 'Marketing':
        return 'marketing';
      case 'Team':
        return 'team';
      case 'Design':
        return 'design';
      case 'Backoffice':
        return 'backoffice';
      case 'Media':
        return 'media';
      case 'IT':
        return 'it';
      case 'Sales':
        return 'sales';
      default:
        return '';
    }
  }

  // 
  handleAlerts() {
    this.alert_category();
    this.alert_assigned();
    this.alert_prio();
    this.timeout();
  }

  // 
  alert_category() {
    if (this.task.category == '') {
      this.category = true;
    }
  }

  // 
  alert_assigned() {
    if (this.task.assignedTo.length == 0) {
      this.assigned = true;
    }
  }

  // 
  alert_prio() {
    if (this.task.priority == '') {
      this.prio = true;
    }
  }

  timeout() {
    setTimeout(() => {
      this.category = false;
      this.assigned = false;
      this.dueDate = false;
      this.prio = false;
    }, 3000);
  }

  // GIVE SUBTASK ERROR
  handleSubError() {
    this.subError = true;
    setTimeout(() => {
      this.subError = false;
    }, 3000);
  }

 














  // SAVE TASKS TO DB
  // saveTaskToFirestore() {
  //   const coll = collection(this.fire, 'allTasks');
  //   setDoc(doc(coll), this.task.toJSON());
  // }

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
    let coll = collection(this.fire, 'allContacts');
    this.allContacts$ = collectionData(coll);
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

  //--BOARD--//

  // DELETE TASK AFTER 3 DAYS IF IT'S DONE
  deleteDoneTasks(task: any) {
    setTimeout(() => {
      task = this.allTasks.filter(item => {
        let now = new Date();
        let diff = now.getTime() - task.createdAt.getTime();
        let days = diff / (1000 * 60 * 60 * 24);
        return days < 3;
      });
    }, 1000 * 60 * 60 * 24 * 3);
    //  MS  *  S * M  * H  * T
  }

  // UPDATE TASK STATUS IN DB
  updateTask(task: any, status: any) {
    this.firestore
      .collection("allTasks")
      .doc(task.customIdName)
      .update({ status: status });
  }
}