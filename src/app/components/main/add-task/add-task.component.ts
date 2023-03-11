import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.class';

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
  addSubInput: string = '';
  addedSubTasks: string[] = [];
  // 
  subError = false;
  taskCreated = false;
  // 
  constructor(
    public data: DataService,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    this.setForm();
  }

  // 
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
  getPrio(prio) {
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

  // DISPLAYS ALL CREATED SUBTASKS
  updateSubTask(event: any) {
    this.addSubInput = event.target.value;
  }

  // CREATE SUBTASK
  addSubTask() {
    if (this.addSubInput == '' || this.addSubInput.length < 4) {
      this.handleSubError();
      console.log('alert error', this.subError);
      // ADD ALERT 
    } else {
      this.addedSubTasks.push(this.addSubInput);
    }
  }

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
    let category = this.taskForm.value.category;
    let assignedTo = this.taskForm.value.assignedTo;
    let dueDate = this.taskForm.value.dueDate;
    let prio = this.task.priority;
    let subtasks = this.addedSubTasks;

    let capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    let formattedTitle = capitalizeFirstLetter(title);
    console.log(formattedTitle);
    console.log(title, description, category, assignedTo, dueDate, prio, subtasks);


    let isValid = (value) => {
      let allowedCharacters = /^[A-Za-z0-9+-]+$/;
      return allowedCharacters.test(value);
    }
    let validTitle = isValid(formattedTitle) && formattedTitle.length >= 3;
    let validDescription = isValid(description) && description.length >= 3;
    console.log(validTitle, validDescription);
  }

  // 
  resetForm() {
    console.log('form should be reset');
  }

  addTaskToDb() {
    this.checkForm();
    // if (this.taskCreated) {
    this.data.changeContactStatus();
    this.data.setId();
    this.data.setDate();
    // this.data.alert = true;
    // this.data.saveTaskToFirestore();
    // setTimeout(() => {
    //   this.router.navigate(['/kanbanboard/board']);
    // }, 2500);
    console.log(this.task)
    // }

  }



  // ADD TASK TO LOCAL STORAGE
  // addTask() {
  //   this.getAllInputs();

  //   if (this.data.taskCreated === true) {
  //     this.data.changeContactStatus();
  //     this.data.setId();
  //     this.data.setDate();
  //     this.clearAllValues();
  //     this.data.alert = true;
  //     this.data.saveTaskToFirestore();
  //     setTimeout(() => {
  //       this.router.navigate(['/kanbanboard/board']);
  //     }, 2500);
  //     console.log(this.data.newTask);
  //     console.log(this.data.newTask.assignedTo);
  //   }
  // }


  // GET TASK INPUTS
  // getAllInputs() {
  //   this.data.newTask.title = this.titleElement.nativeElement.value;
  //   this.data.newTask.description = this.descriptionElement.nativeElement.value;
  //   this.data.newTask.category = this.categoryElement.nativeElement.value;
  //   this.data.newTask.dueDate = this.dueDateElement.nativeElement.value;
  //   this.data.newTask.assignedTo = this.assignedCollegues;
  //   this.data.newTask.subtasks = this.addedSubTasks;
  //   this.checkIfInputIsEmpty();
  //   this.data.changeContactStatus();
  // }

  // CHECK EMPTY INPUTS
  // checkIfInputIsEmpty() {
  //   if (this.titleElement.nativeElement.value === '' ||
  //     this.categoryElement.nativeElement.value === '' ||
  //     this.descriptionElement.nativeElement.value === '' ||
  //     this.dueDateElement.nativeElement.value === '' ||
  //     this.data.newTask.priority === ''
  //   ) {
  //     this.data.taskCreated = false;
  //     this.clearAllValues();
  //   } else if (this.titleElement.nativeElement.value.length >= 1 &&
  //     this.categoryElement.nativeElement.value.length == 1 &&
  //     this.data.newTask.assignedTo.length > 0
  //   ) {
  //     this.data.taskCreated = true;
  //   }
  // }

  // CLEAR ALL INPUT.VALUES
  // clearAllValues() {
  //   this.titleElement.nativeElement.value = '';
  //   this.descriptionElement.nativeElement.value = '';
  //   this.categoryElement.nativeElement.value = '';
  //   this.assignedCollegues = [];
  //   this.dueDateElement.nativeElement.value = '';
  //   this.priority = '';
  //   this.subInputElement.nativeElement.value = '';
  //   this.addedSubTasks = [];
  //   this.subtasks = [];
  // }
}