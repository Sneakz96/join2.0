import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  datePattern: string = '^\\d{2}\\/\\d{2}\\/\\d{4}$'
  // 
  subtask: subtask;
  @ViewChild('subInput') subInput: ElementRef;
  addedSubTasks: any[] = [];
  // ALERTS
  category = false;
  assigned = false;
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
      'category': new FormControl(this.task.category, [
        Validators.required,
      ]),
      'assignedTo': new FormControl(this.task.assignedTo, [
        Validators.required,
      ]),
      'dueDate': new FormControl(this.task.dueDate, [
        Validators.required,
      ]),
      'prio': new FormControl(this.task.priority, [
        Validators.required,
      ]),
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
    console.log(this.task.priority)
    let title = this.taskForm.value.title.trim();
    let description = this.taskForm.value.description.trim();
    let formattedTitle = this.capitalizeFirstLetter(title);

    this.task.title = formattedTitle;
    this.task.description = description;
    this.task.category = this.taskForm.value.category;
    this.task.assignedTo = this.assignedCollegues;
    this.task.subtasks = this.addedSubTasks;

    this.setCreationDate();
    this.getDueDate();
    this.changeContactStatus();
    this.setId();
    this.handleAlerts();
    console.log(this.task)
    // Überprüfen, ob das Formular gültig ist
    if (this.task.title.length > 3 &&
      this.task.description.length > 3 &&
      this.taskForm.value.category.length >= 1 &&
      this.assignedCollegues.length >= 1) {
      console.log(this.task)
      this.taskCreated = true;
      this.addTaskToDb();
    }
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
    console.log(prio);
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

  // CHECK VALIDATION
  checkValidation(): void {
    this.data.handleAlerts();

    let isTitleValid = this.task.title.length >= 3;
    let isDescriptionValid = this.task.description.length >= 3;
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
    this.high = false;
    this.medium = false;
    this.low = false;
  }

  // FORM_CHECKS

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

  // 
  timeout() {
    setTimeout(() => {
      this.category = false;
      this.assigned = false;
      this.prio = false;
    }, 3000);
  }

}