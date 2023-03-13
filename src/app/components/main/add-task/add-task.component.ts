import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.class';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';

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

  //
  @ViewChild('subInput') subInput: ElementRef;
  addedSubTasks: string[] = [];
  // 
  subError = false;
  taskCreated = false;

  // 
  constructor(
    public data: DataService,
    public router: Router,
    private fire: Firestore,
  ) { }

  ngOnInit(): void {
    this.setForm();
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
    console.log(this.taskForm.value.dueDate)

    let capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    let formattedTitle = capitalizeFirstLetter(title);
    let isValid = (value) => {
      let allowedCharacters = /^[A-Za-z0-9+-]+$/;
      return allowedCharacters.test(value);
    }
    let isValidDate = (value) => {
      let expectedFormat = /^\w{3} \w{3} \d{1,2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4} \(.+\)$/;
      return expectedFormat.test(value);
    };

    isValid(formattedTitle) && formattedTitle.length >= 3;
    isValid(description) && description.length >= 3;
    this.task.title = formattedTitle;
    this.task.description = description;
    this.task.category = this.taskForm.value.category;
    this.task.assignedTo = this.assignedCollegues;
    this.task.priority = this.task.priority;
    this.task.subtasks = this.addedSubTasks;
    this.task.dueDate = this.taskForm.value.dueDate;
    // this.getDueDate(); 
    this.changeContactStatus();
    this.setId();
    this.setDate();
    this.checkValidation(this.task);
    console.log(this.task);
  }


  checkValidation(task: any) {
    this.taskCreated = true;
    console.log(task.title = '');
    // if (task.) {
    // }else{
    //   this.addTaskToDb();

    // }
  }

  // CHANGE STATUS OF ASSIGNED CONTACTS
  changeContactStatus() {
    for (let i = 0; i < this.task.assignedTo.length; i++) {
      let element = this.task.assignedTo[i];
      element.selected = true;
    }
  }

  // // 
  // getDueDate() {
  //   let date = this.taskForm.value.dueDate;
  //   let day = date.getDate();
  //   let month = date.getMonth() + 1;
  //   let year = date.getFullYear();
  //   let formattedDate = `${month}/${day}/${year}`;
  //   this.task.dueDate = formattedDate;
  // }

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

  // 
  checkAlerts() {
    console.log('alert');
    if (this.task.dueDate == '') {
      console.log('due date is missing!', this.task.dueDate);
      this.taskCreated = false;
    }
    if (this.task.category == '') {
      console.log('category is missing!', this.task.category);
      this.taskCreated = false;
    }
    if (this.task.assignedTo = []) {
      console.log('select a contact!', this.task.assignedTo);
      this.taskCreated = false;
    }
  }



}


