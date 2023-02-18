import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogAddUserComponent } from '../components/main/dialogs/dialog-add-user/dialog-add-user.component';
import { DialogEditUserComponent } from '../components/main/dialogs/dialog-edit-user/dialog-edit-user.component';
import { Task } from '../models/task.class';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  // ALERTS
  alert = false;
  taskCreated = true;
  contactCreated = false;
  mbDevice = null;
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
  today: Date;
  // CONTACTS
  allContacts = [];
  allContacts$: Observable<any>;
  firstNames: string[] = this.allContacts.map(allContacts => allContacts.firstName);
  initialsFirstNames: string[] = [];
  // USERNAME
  userName: string = 'Guest';

  // 
  constructor(
    private router: Router,
    private fire: Firestore,
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    private editUser: DialogEditUserComponent,
    private addUser: DialogAddUserComponent,
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
  ) {
    this.getDayTime();
    this.loadTasks();
    this.loadContacts();
    this.loadContactListInAddTask();
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

  // CHANGE STATUS OF ASSIGNED CONTACTS
  changeContactStatus() {
    for (let i = 0; i < this.newTask.assignedTo.length; i++) {
      let element = this.newTask.assignedTo[i];
      element.selected = true;
      console.log(element.selected);
    }
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

  // SET FORM OF NEW CONTACT
  setUserForm() {
    this.addUser.contactForm = new FormGroup({
      'firstName': new FormControl(this.addUser.contact.firstName),
      'lastName': new FormControl(this.addUser.contact.lastName),
      'email': new FormControl(this.addUser.contact.email),
      'phone': new FormControl(this.addUser.contact.phone),
    });
  }

  // SET USER FORM
  checkUserForm() {
    let firstName = this.addUser.contactForm.value.firstName.replace(/\s/g, '');
    let lastName = this.addUser.contactForm.value.lastName.replace(/\s/g, '');
    let mail = this.addUser.contactForm.value.email.replace(/\s/g, '');
    let phone = this.addUser.contactForm.value.phone.replace(/\s/g, '');
    let checkInputs = (value: string): boolean => {
      let allowedCharacters = /^[A-Za-z0-9+-]+$/;
      return allowedCharacters.test(value);
    };
    let checkMail = (value: string): boolean => {
      let allowedNumbers = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return allowedNumbers.test(value);
    };
    let checkNumber = (value: string): boolean => {
      let allowedNumbers = /^[0-9+/+]+$/;
      return allowedNumbers.test(value);
    };
    let first = checkInputs(firstName);
    let last = checkInputs(lastName);
    let email = checkMail(mail);
    let number = checkNumber(phone);

    if (!first || !last || !email || !number) {
    } else {
      this.addUser.contact.firstName = firstName;
      this.addUser.contact.lastName = lastName;
      this.addUser.contact.email = mail;
      this.addUser.contact.phone = phone;
      this.setUserID();
      this.setContactColor();
      this.addNewUser();
    }
  }

  // SET BG_COLOR OF CIRCLE BY FIRST LETTER OF LAST NAME
  setUserColor() {
    switch (this.editUser.user.lastName.charCodeAt(0) % 6) {
      case 0:
        this.editUser.user.color = 'lightgreen'
        break;
      case 1:
        this.editUser.user.color = 'lightgrey'
        break;
      case 2:
        this.editUser.user.color = 'lightblue'
        break;
      case 3:
        this.editUser.user.color = 'red'
        break;
      case 4:
        this.editUser.user.color = 'yellow'
        break;
      case 5:
        this.editUser.user.color = 'orange'
        break;
      case 6:
        this.editUser.user.color = 'purple'
        break;
      case 7:
        this.editUser.user.color = 'pink'
        break;
      default:
    }
  }

  // SET BG_COLOR OF CIRCLE BY FIRST LETTER OF LAST NAME
  setContactColor() {
    switch (this.addUser.contact.lastName.charCodeAt(0) % 6) {
      case 0:
        break;
      case 1:
        this.addUser.contact.color = 'lightgrey'
        break;
      case 2:
        this.addUser.contact.color = 'lightblue'
        break;
      case 3:
        this.addUser.contact.color = 'red'
        break;
      case 4:
        this.addUser.contact.color = 'yellow'
        break;
      case 5:
        this.addUser.contact.color = 'orange'
        break;
      case 6:
        this.addUser.contact.color = 'purple'
        break;
      case 7:
        this.addUser.contact.color = 'pink'
        break;
      default:
    }
  }

  // GIVE NEW USER RANDOM ID
  setUserID() {
    this.addUser.contact.id = 20000 * Math.random();
  }

  // OPEN ADD_CONTACT_OVERLAY
  addNewContact() {
    this.dialog.open(DialogAddUserComponent);
  }

  // CHECK FORM VALIDATION AND ADD CREATED USER TO CONTACT-LIST
  addNewUser() {
    this.contactCreated = true;
    this.saveUserToFirestore();
    this.closeDialog();
    this.router.navigate(['/kanbanboard/contacts']);
    setTimeout(() => {
      this.contactCreated = false;
    }, 3000);
  }

  // SAVE NEW USER TO DB
  saveUserToFirestore() {
    const coll = collection(this.fire, 'allContacts');
    setDoc(doc(coll), this.addUser.contact.toJSON());
  }

  // SAVE EDITED USER TO DB
  save() {
    this.setUserColor();
    this.editUser.closeDialog();
    this.firestore
      .collection('allContacts')
      .doc(this.editUser.userId)
      .update(this.editUser.user.toJSON());
  }

  // CLOSE DIALOG TO CREATE NEW USER
  closeDialog() {
    this.dialogRef.close();
  }

  // SHOULD CLEAR VALUES OF DIALOG
  clearValues() {
    let firstName = document.getElementById("firstName") as HTMLInputElement;
    let lastName = document.getElementById("lastName") as HTMLInputElement;
    let mail = document.getElementById("mail") as HTMLInputElement;
    let phone = document.getElementById("phone") as HTMLInputElement;
    firstName.value = '';
    lastName.value = '';
    mail.value = '';
    phone.value = '';
  }
}