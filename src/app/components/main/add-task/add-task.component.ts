import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.class';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { timeout } from 'rxjs';
import { set } from '@angular/fire/database';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})

export class AddTaskComponent {
  //
  contact = new FormControl();
  assignedCollegues: string[] = [];
  // 
  task = new Task();
  taskForm!: FormGroup;
  choosenCategory: any;
  // 
  contactForm!: FormGroup;
  //
  @ViewChild('subInput') subInput: ElementRef;
  addedSubTasks: string[] = [];
  // 
  subError = false;
  taskCreated = false;



  // ALERTS
  category = false;
  assigned = false;
  dueDate = false;
  prio = false;

  // 
  constructor(
    public data: DataService,
    public router: Router,
    private fire: Firestore,
  ) {
    this.setForm();
  }

  ngOnInit(): void {

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







  // SET TASK FORM
  setForm() {
    this.taskForm = new FormGroup({
      'title': new FormControl(this.task.title),
      'description': new FormControl(this.task.description),
      'category': new FormControl(this.task.category),
      'assignedTo': new FormControl(this.task.assignedTo),
      'dueDate': new FormControl(this.task.dueDate),
      'prio': new FormControl(this.task.priority),
      'subTasks': new FormControl(this.task.subtasks),
    });
  }

  // LOG PRIO
  setPrio(prio: string) {
    this.task.priority = prio;
    this.getPrio(prio);
  }

  // GET PRIO STATUS -> SET BOOLEAN
  getPrio(prio: string) {
    if (prio == 'Low') {
      this.data.low = true;
      this.data.medium = false;
      this.data.high = false;
    } else if (prio == 'Medium') {
      this.data.low = false;
      this.data.medium = true;
      this.data.high = false;
    } else if (prio == 'Urgent') {
      this.data.low = false;
      this.data.medium = false;
      this.data.high = true;
    }
  }

  // CREATE SUBTASK
  addSubTask() {
    if (this.subInput.nativeElement.value == '') {
      this.handleSubError();
    } else {
      this.addedSubTasks.push(this.subInput.nativeElement.value);
      this.subInput.nativeElement.value = '';
    }
  }

  // GIVE SUBTASK ERROR
  handleSubError() {
    this.subError = true;
    setTimeout(() => {
      this.subError = false;
    }, 3000);
  }

  // 
  checkForm() {
    let title = this.taskForm.value.title.trim();
    let description = this.taskForm.value.description.trim();

    let capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    let formattedTitle = capitalizeFirstLetter(title);
    console.log(this.taskForm.value.dueDate);
    this.task.title = formattedTitle;
    this.task.description = description;
    this.task.category = this.taskForm.value.category;
    this.task.assignedTo = this.assignedCollegues;
    this.task.priority = this.task.priority;
    this.task.subtasks = this.addedSubTasks;
this.handleDate();

    this.changeContactStatus();
    this.setId();
    this.setDate();
    this.checkValidation();
  }

  // 
  checkValidation() {
    this.handleAlerts();
    console.log(this.task.dueDate);
    if (this.task.title.length > 4 &&
      this.task.description.length > 8 &&
      this.task.category &&
      this.task.assignedTo.length > 0 &&
      this.task.dueDate &&
      this.task.priority
    ) {
      // debugger;
      this.taskCreated = true;
      this.addTaskToDb();
    }
  }

  // CHANGE STATUS OF ASSIGNED CONTACTS
  changeContactStatus() {
    for (let i = 0; i < this.task.assignedTo.length; i++) {
      let element = this.task.assignedTo[i];
      element.selected = true;
    }
  }

  // SET TASK ID
  setId() {
    let id = new Date().getTime();
    this.task.id = id / 1000000000;
  }

  // SET CREATION TIME
  setDate() {
    let date = new Date().getTime();
    this.task.createdAt = date;
  }

  handleDate() {
    
    // Beispiel-Input-String vom Datepicker
    const input = "Tue Mar 14 2023 00:00:00 GMT+0100 (Mitteleuropäische Normalzeit)";

    // Das Datum in ein JavaScript-Date-Objekt umwandeln
    const date = new Date(input);

    // Das gewünschte Datum-Format extrahieren
    const month = date.getMonth() + 1; // +1, da getMonth() mit 0 für Januar beginnt
    const day = date.getDate();
    const year = date.getFullYear();

    // Das Datum im gewünschten Format speichern
    const output = `${month}/${day}/${year}`;
    console.log(output); // Output: "3/14/2023"
    this.task.dueDate = output;
  }

  // 
  resetForm() {
    this.taskForm.reset();
    this.subInput.nativeElement.value = '';
    this.addedSubTasks = [];
    this.task.priority = '';
    // REMOVE ACTIVE CLASS
    this.data.high = false;
    this.data.medium = false;
    this.data.low = false;
  }

  // 
  addTaskToDb() {
    this.data.alert = true;
    this.saveTaskToFirestore();
    this.resetForm();
    setTimeout(() => {
      this.router.navigate(['/kanbanboard/board']);
    }, 2500);

  }

  // SAVE TASKS TO DB
  saveTaskToFirestore() {
    let coll = collection(this.fire, 'allTasks');
    setDoc(doc(coll), this.task.toJSON());
  }
}


