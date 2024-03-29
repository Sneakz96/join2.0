import { Component, ElementRef, ViewChild } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  // CONTACTS
  contact = new FormControl();
  assignedCollegues: string[] = [];
  // TASK
  task = new Task();
  taskForm!: FormGroup;
  choosenCategory: any;
  // SUBINPUT
  @ViewChild('subInput') subInput: ElementRef;
  // 
  subtask: subtask;
  addedSubTasks: any[] = [];
  //
  category = false;
  dueDate = false;
  assigned = false;
  prio = false;
  description = false;
  taskCreated = false;
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
  }

  // 
  handleAlerts() {
    this.alert_description();
    this.alert_category();
    this.alert_assigned();
    this.alert_dueDate();
    this.alert_prio();
    this.timeout();
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
    if (this.task.dueDate == '') {
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
      this.description = false;
      this.category = false;
      this.assigned = false;
      this.dueDate = false;
      this.prio = false;
    }, 3000);
  }

  // SET TASK FORM
  setForm() {
    this.taskForm = new FormGroup({
      'title': new FormControl(this.task.title, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z ]+$/),
      ]),
      'description': new FormControl(this.task.description, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      'category': new FormControl(this.task.category, [Validators.required]),
      'assignedTo': new FormControl(this.task.assignedTo, [Validators.required]),
      'dueDate': new FormControl('', [Validators.required]),
      'prio': new FormControl(this.task.priority, [Validators.required]),
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
    return { text, done: false };
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
    let { title, description, category, dueDate } = this.taskForm.value;

    this.task.title = this.capitalizeFirstLetter(title.trim());
    this.task.description = description.trim();
    this.task.category = category;
    this.task.assignedTo = this.assignedCollegues;
    this.task.subtasks = this.addedSubTasks;
    this.setCreationDate();
    this.changeContactStatus();
    this.setId();
    this.handleAlerts();
    this.getDueDate();

    let isFormValid =
      this.task.title.length > 3 &&
      this.task.description.length > 3 &&
      category.length >= 1 &&
      this.assignedCollegues.length >= 1 &&
      !isNaN(new Date(dueDate).getTime());

    if (isFormValid) {
      this.taskCreated = true;
      this.addTaskToDb();
      this.close();
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

  // GET DUE DATE FOR TASK
  getDueDate() {
    let date = new Date(this.taskForm.value.dueDate);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let output = `${month}/${day}/${year}`;
    this.task.dueDate = output;
  }

  // ADD CURRENT TASK TO DB
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

  // RESET TASK FORM
  resetForm() {
    this.taskForm.reset();
    this.subInput.nativeElement.value = '';
    this.addedSubTasks = [];
    this.task.priority = '';
    this.data.high = false;
    this.data.medium = false;
    this.data.low = false;
  }

  // CLOSE DIALOG
  close() {
    this.dialogRef.close();
  }
}