import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.class';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss']
})

export class DialogAddTaskComponent {
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

// 
constructor(
  public data: DataService,
  public router: Router,
  private fire: Firestore,
  public dialogRef: MatDialogRef<DialogAddTaskComponent>
) {
  this.setForm();
}

ngOnInit(): void {

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
  this.data.handleAlerts();
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

// 
handleDate() {
  let input = "Tue Mar 14 2023 00:00:00 GMT+0100 (Mitteleuropäische Normalzeit)";
  let date = new Date(input);
  let month = date.getMonth() + 1; 
  let day = date.getDate();
  let year = date.getFullYear();

  let output = `${month}/${day}/${year}`;
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
  this.dialogRef.close();
}

// SAVE TASKS TO DB
saveTaskToFirestore() {
  let coll = collection(this.fire, 'allTasks');
  setDoc(doc(coll), this.task.toJSON());
}

}