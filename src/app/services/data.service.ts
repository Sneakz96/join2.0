import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogAddUserComponent } from '../components/main/dialogs/dialog-add-user/dialog-add-user.component';
import { Contact } from '../models/contact.class';
import { Task } from '../models/task.class';

@Injectable({
  providedIn: 'root'
})

export class DataService {
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
  allTasks = [];
  taskForm!: FormGroup;
  taskId: any;
  id: string;
  // BOARD
  toDo = [];
  awaitingFeedback = [];
  progress = [];
  did = [];
  // SUMMARY
  todos!: number;
  inProgress!: number;
  feedback!: number;
  done!: number;
  urgent!: number;
  deadline!: string;
  dayTime!: string;
  today: Date;
  // USERNAME
  userName: string = 'Guest';
  // CONTACTS
  user = new Contact();
  allContacts = [];
  allContacts$: Observable<any>;
  firstNames: string[] = this.allContacts.map(allContacts => allContacts.firstName);
  initialsFirstNames: string[] = [];
  //
  mbDevice = null;
  // URGENCY
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
  }

  // LOAD ALL TASKS FROM FIRESTORE
  loadTasks() {
    this.firestore
      .collection('allTasks')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((task: any) => {
        this.allTasks = task;
        this.clear();
        this.count(this.allTasks);
        this.checkSubLength();
        this.sort();
      });
  }

  // CHECK LENTGTH OF ADDED SUBTASKS
  checkSubLength() {
    for (let i = 0; i < this.allTasks.length; i++) {
      this.checkChecked(this.allTasks[i]);
    }
  }

  // CHECK MARKED SUBTASKS
  checkChecked(task: Task) {
    let checkedSubtasks = [];
    for (let i = 0; i < task.subtasks.length; i++) {
      if (task.subtasks[i].done) {
        checkedSubtasks.push(task.subtasks[i]);
      }
    }
    return checkedSubtasks.length;
  }

  // GIVE SUBTASK ERROR
  handleSubError() {
    this.subError = true;
    setTimeout(() => {
      this.subError = false;
    }, 3000);
  }

  // GET PRIO STATUS -> SET BOOLEAN
  getPrio(prio: string) {
    if (prio == 'Low') {
      this.low = true;
      this.medium = false;
      this.high = false;
    } else if (prio == 'Medium') {
      this.low = false;
      this.medium = true;
      this.high = false;
    } else if (prio == 'Urgent') {
      this.low = false;
      this.medium = false;
      this.high = true;
    }
  }

  // SAVE TASKS TO DB
  saveTaskToFirestore() {
    let coll = collection(this.fire, 'allTasks');
    setDoc(doc(coll), this.task.toJSON());
  }

  // SUMMARY
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

  // RESET ALL NUMBERS BEFORE COUNT ALL TASKS
  clear() {
    this.todos = 0;
    this.inProgress = 0;
    this.feedback = 0;
    this.done = 0;
    this.urgent = 0;
  }

  // COUNT ALL.TASKS ON STATUS
  count(tasks: any[]): void {
    tasks.forEach((task, index) => {
      this.getLowestDueDate(task, index);
      switch (task.status) {
        case 'toDo':
          this.todos++;
          break;
        case 'inProgress':
          this.inProgress++;
          break;
        case 'awaitingFeedback':
          this.feedback++;
          break;
        case 'done':
          this.done++;
          break;
        default:
          break;
      }
      if (task.priority === 'Urgent') {
        this.urgent++;
        this.deleteDoneTasks(task);
      }
    });
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

  // CONTACTS
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

  public capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  public isValidInput(value: string): boolean {
    return /^[A-Za-z0-9+-]+$/.test(value);
  }

  public isValidEmail(value: string): boolean {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
  }

  public isValidNumber(value: string): boolean {
    return /^[0-9+/+]+$/.test(value);
  }

  //--BOARD--//
  sort() {
    this.toDo = [];
    this.awaitingFeedback = [];
    this.progress = [];
    this.did = [];
    for (let i = 0; i < this.allTasks.length; i++) {
      let task = this.allTasks[i];
      if (this.allTasks[i].status === 'toDo') {
        this.toDo.push(task);
      } else if (this.allTasks[i].status === 'awaitingFeedback') {
        this.awaitingFeedback.push(task);
      } else if (this.allTasks[i].status === 'inProgress' || this.allTasks[i].status === 'dropList_2') {
        this.progress.push(task);
      } else if (this.allTasks[i].status === 'done') {
        this.did.push(task);
      }
    }
  }

  // GET COLOR OF CURRENT CATEGORY
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

  // 
  updateTaskInFirebase(taskId: string, updatedTask: any) {
    this.firestore
      .collection('allTasks')
      .doc(taskId)
      .update(updatedTask);
  }
}