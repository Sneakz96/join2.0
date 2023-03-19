import { Component, ElementRef, ViewChild } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.class';
import { DataService } from 'src/app/services/data.service';

interface subtask {
  text: any,
  done: boolean,
}

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss']
})

export class DialogAddTaskComponent {
  //CONTACTS
  contact = new FormControl();
  assignedCollegues: string[] = [];
  // TASK
  task = new Task();
  taskForm!: FormGroup;
  choosenCategory: any;
  // SUBINPUT
  subtask: subtask;
  @ViewChild('subInput') subInput: ElementRef;
  addedSubTasks: any[] = [];
  // ALERTS
  category = false;
  assigned = false;
  prio = false;
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
    public dialogRef: MatDialogRef<DialogAddTaskComponent>
  ) {
    this.setForm();
    this.taskForm.valueChanges.subscribe(console.log);
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

  // 
  timeout() {
    setTimeout(() => {
      this.category = false;
      this.assigned = false;
      this.prio = false;
    }, 3000);
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
      'dueDate': new FormControl('', [
        Validators.required,
        // Validators.pattern(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/)
      ]),
      'prio': new FormControl(this.task.priority, [
        Validators.required,
      ]),
      'subTasks': new FormControl(this.task.subtasks),
    });
  }

  // LOG PRIO
  setPrio(prio: string) {
    this.task.priority = prio;
    this.data.getPrio(prio);
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

    console.log('checkup');
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

  // 
  getDueDate() {
    let date = new Date(this.taskForm.value.dueDate);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let output = `${month}/${day}/${year}`;
    this.task.dueDate = output;
  }

  addTask() {
    this.checkForm();
    console.log(this.task);
    if (this.task.title.length >= 3
    ) {
      this.taskCreated = true;
      // this.addTaskToDb();
      // this.close();
    }
  }

  // 
  addTaskToDb() {
    this.data.alert = true;
    this.saveTaskToFirestore();
    this.resetForm();
    this.close();
    this.router.navigate(['/kanbanboard/board']);
  }

  // SAVE TASKS TO DB
  saveTaskToFirestore() {
    let coll = collection(this.fire, 'allTasks');
    setDoc(doc(coll), this.task.toJSON());
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

  // CLOSE DIALOG
  close() {
    this.dialogRef.close();
  }
}