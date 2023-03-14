import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Task } from 'src/app/models/task.class';
import { Router } from '@angular/router';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';

interface subtask {
  text: string;
  status: string;
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
    private fire: Firestore,
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
  addSubTask() {
    if (this.subInput.nativeElement.value == '') {
      this.data.handleSubError();
    } else {
      if (this.addedSubTasks.length == 4) {
        this.subMax = true;
        this.handleSubError();
      } else if (this.subInput.nativeElement.value.length <= 3) {
        this.subLength = true;
        this.handleSubError();
      } else {
        let subtaskText = this.subInput.nativeElement.value;
        let newSubtask = this.createNewSubtask(subtaskText);
        console.log('add sub', newSubtask);
        console.log(newSubtask.status);
        this.addedSubTasks.push(newSubtask);
        console.log(this.addedSubTasks);
        this.subInput.nativeElement.value = '';
      }
    }
  }

  //
  createNewSubtask(text: string): subtask {
    return {
      text: text,
      status: 'toDo'
    };
  }

  // 
  handleSubError() {
    setTimeout(() => {
      this.subLength = false;
      this.subMax = false;
    }, 3000);
  }

  // 
  checkForm() {
    debugger;
    let title = this.taskForm.value.title.trim();
    let description = this.taskForm.value.description.trim();

    let capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    let formattedTitle = capitalizeFirstLetter(title);

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
    console.log(this.task);
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
      this.taskCreated = true;
      this.addTaskToDb();
    }
  }
  // 
  addTaskToDb() {
    this.data.alert = true;
    this.saveTaskToFirestore();
    this.taskForm.reset();
    setTimeout(() => {
      this.router.navigate(['/kanbanboard/board']);
    }, 2500);
  }

  // SAVE TASKS TO DB
  saveTaskToFirestore() {
    const coll = collection(this.fire, 'allTasks');
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
}