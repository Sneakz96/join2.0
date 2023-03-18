import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Task } from 'src/app/models/task.class';
import { Router } from '@angular/router';

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
  taskCreated = false;
  subMax = false;
  subLength = false;
  // 
  constructor(
    public data: DataService,
    public router: Router,
  ) {
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
    let newSubtask = this.createNewSubtask(this.subInput.nativeElement.value);
    this.addedSubTasks.push(newSubtask);
    this.subInput.nativeElement.value = '';
  }

  // 
  createNewSubtask(text: string): any {
    const newSubtask = {
      text: text,
      done: false
    };
    return newSubtask;
  }

  // 
  handleSubError() {
    setTimeout(() => {
      this.subLength = false;
      this.subMax = false;
    }, 3000);
  }

  // 
  checkForm(): void {
    let title = this.taskForm.value.title.trim();
    let description = this.taskForm.value.description.trim();
    let formattedTitle = this.capitalizeFirstLetter(title);

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
  setDate() {
    let date = new Date().getTime();
    this.task.createdAt = date;
  }

  // LOG PRIO
  setPrio(prio: string) {
    this.task.priority = prio;
    this.data.getPrio(prio);
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

  // HANDLE DATE FOR TASK
  handleDate() {
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let output = `${month}/${day}/${year}`;
    this.task.dueDate = output;
  }

  // CHECK VALIDATION
  checkValidation(): void {
    this.data.handleAlerts();

    let isTitleValid = this.task.title.length > 4;
    let isDescriptionValid = this.task.description.length > 8;
    let isCategoryValid = !!this.task.category;
    let isAssignedToValid = this.task.assignedTo.length > 0;
    let isDueDateValid = !!this.task.dueDate;
    let isPriorityValid = !!this.task.priority;

    if (isTitleValid && isDescriptionValid && isCategoryValid &&
      isAssignedToValid && isDueDateValid && isPriorityValid) {
      this.taskCreated = true;
      console.log('task created', this.task);
      // this.addTaskToDb();
    }
  }

  // ADD TO DB
  addTaskToDb() {
    this.data.alert = true;
    this.data.saveTaskToFirestore();
    this.resetForm();
    this.addedSubTasks = [];
    this.router.navigate(['/kanbanboard/board']);
  }

  // RESET FORM
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
}