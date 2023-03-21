import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Task } from 'src/app/models/task.class';
import { Router } from '@angular/router';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';

interface subtask {
  text: any,
  done: boolean,
}

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
  subtask: subtask;
  @ViewChild('subInput') subInput: ElementRef;
  addedSubTasks: any[] = [];
  // ALERTS
  title = false;
  description = false;
  category = false;
  assigned = false;
  dueDate = false;
  prio = false;
  // 
  low = false;
  medium = false;
  high = false;
  // 
  taskCreated = false;
  // 
  subError = false;
  subMax = false;
  subLength = false;
  // 
  constructor(
    private fire: Firestore,
    public data: DataService,
    public router: Router,
  ) {
    this.setForm();
    this.taskForm.valueChanges.subscribe(console.log);
  }

  // SET TASK FORM
  setForm() {
    this.taskForm = new FormGroup({
      'title': new FormControl(this.task.title, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z ]+$/)
      ]),
      'description': new FormControl(this.task.description, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
      'category': new FormControl(this.task.category, [Validators.required,]),
      'assignedTo': new FormControl(this.task.assignedTo, [Validators.required,]),
      'dueDate': new FormControl(this.task.dueDate, [Validators.required,]),
      'prio': new FormControl(this.task.priority, [Validators.required,]),
      'subTasks': new FormControl(this.task.subtasks)
    });
  }

  // CREATE SUBTASK
  addSubTask(): void {
    let subInputValue = this.subInput.nativeElement.value.trim();
    if (!subInputValue) {
      this.data.handleSubError();
      return;
    }
    if (this.addedSubTasks.length === 4) {
      this.subMax = true;
      this.handleSubError();
      return;
    }
    if (subInputValue.length <= 3) {
      this.subLength = true;
      this.handleSubError();
      return;
    }
    let newSubtask = this.createNewSubtask(subInputValue);
    this.addedSubTasks.push(newSubtask);
    this.subInput.nativeElement.value = '';
  }

  // 
  createNewSubtask(text: string): { text: string; done: boolean } {
    return {
      text,
      done: false,
    };
  }

  // 
  handleSubError(): void {
    setTimeout(() => {
      this.subLength = false;
      this.subMax = false;
    }, 3000);
  }

  // 
  checkForm(): void {
    this.task.title = this.getFormattedTitle();
    this.task.description = this.taskForm.value.description.trim();
    this.task.category = this.taskForm.value.category;
    this.task.assignedTo = this.getAssignedTo();
    this.task.subtasks = this.getSubtasks();
    this.setCreationDate();
    this.getDueDate();
    this.changeContactStatus();
    this.setId();
    this.handleAlerts();
  
    if (this.isTaskValid()) {
      this.taskCreated = true;
      this.addTaskToDb();
    }
  }
  
  getFormattedTitle(): string {
    let title = this.taskForm.value.title.trim();
    return this.capitalizeFirstLetter(title);
  }
  
  getAssignedTo(): string[] {
    return this.assignedCollegues;
  }
  
  getSubtasks(): { text: string; done: boolean }[] {
    return this.addedSubTasks;
  }
  
  isTaskValid(): boolean {
    let { title, description, category } = this.taskForm.value;
    let { assignedTo, subtasks } = this.task;
    let dueDate = this.taskForm.value.dueDate;
  
    return (
      title.length > 3 &&
      description.length > 3 &&
      category.length >= 1 &&
      assignedTo.length >= 1 &&
      subtasks.length >= 0 &&
      dueDate !== 'NaN/Nan/Nan'
    );
  }

  // 
  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
  setCreationDate() {
    let date = new Date().getTime();
    this.task.createdAt = date;
  }

  // LOG PRIO
  setPrio(prio: string) {
    this.task.priority = prio;
    this.getPrio(prio);
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

  // HANDLE DATE FOR TASK
  getDueDate() {
    let date = new Date(this.taskForm.value.dueDate);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let output = `${month}/${day}/${year}`;
    this.task.dueDate = output;
  }
  
  // ADD TO DB
  addTaskToDb() {
    this.data.alert = true;
    this.saveTaskToFirestore();
    this.resetForm();
    this.addedSubTasks = [];
    this.router.navigate(['/kanbanboard/board']);
  }

  // 
  saveTaskToFirestore() {
    let coll = collection(this.fire, 'allTasks');
    setDoc(doc(coll), this.task.toJSON());
  }
  
  // RESET FORM
  resetForm() {
    this.taskForm.reset();
    this.subInput.nativeElement.value = '';
    this.addedSubTasks = [];
    this.task.priority = '';
    this.high = false;
    this.medium = false;
    this.low = false;
  }

  // FORM & ALERT CHECKS
  // 
  handleAlerts() {
    this.alert_title();
    this.alert_description();
    this.alert_category();
    this.alert_dueDate();
    this.alert_assigned();
    this.alert_prio();
    this.timeout();
  }

  // 
  alert_title() {
    if (this.task.title == '') {
      this.title = true;
    }
  }

  // 
  alert_description() {
    if (this.task.description == '') {
      this.description = true;
    }
  }

  // 
  alert_category() {
    if (this.task.category == '') {
      this.category = true;
    }
  }

  // 
  alert_dueDate() {
    if (this.task.dueDate == 'NaN/NaN/NaN') {
      this.dueDate = true;
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

  // 
  timeout() {
    setTimeout(() => {
      this.title = false;
      this.description = false;
      this.category = false;
      this.assigned = false;
      this.dueDate = false;
      this.prio = false;
    }, 3000);
  }
}