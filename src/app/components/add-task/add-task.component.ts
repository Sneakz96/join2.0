import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})

export class AddTaskComponent implements OnInit {

  //INPUT FIELDS
  title: string = '';
  description: string = '';
  category: string = '';
  assignedTo: string = '';
  dueDate: string = '';
  priority: string = '';
  createdAt!: number;

  subtasks: string = '';
  subInput: string = '';

  @ViewChild('title', { static: true }) titleElement: ElementRef;
  @ViewChild('description', { static: true }) descripitionElement: ElementRef;
  @ViewChild('category', { static: true }) categoryElement: ElementRef;
  @ViewChild('assignedTo', { static: true }) assignedToElement: ElementRef;
  @ViewChild('dueDate', { static: true }) dueDateElement: ElementRef;

  @ViewChild('subInput', { static: true }) subInputElement: ElementRef;
  @ViewChild('subtasks', { static: true }) subtasksElement: ElementRef;

  constructor(
    titleElement: ElementRef,
    descripitionElement: ElementRef,
    categoryElement: ElementRef,
    assignedToElement: ElementRef,
    dueDateElement: ElementRef,

    subInputElement: ElementRef,
    substasksElement: ElementRef,

  ) {
    this.titleElement = titleElement;
    this.descripitionElement = descripitionElement;
    this.categoryElement = categoryElement;
    this.assignedToElement = assignedToElement;
    this.dueDateElement = dueDateElement;


    this.subInputElement = subInputElement;
    this.subtasksElement = substasksElement;
  }

  ngOnInit(): void {
    this.getContacts();
  }

  //FETCH ALL INPUT.VALUES
  fetchInputValues(event: Event) {
    this.title = this.titleElement.nativeElement.value;
    this.description = this.descripitionElement.nativeElement.value;
    this.category = this.categoryElement.nativeElement.value;
    this.dueDate = this.dueDateElement.nativeElement.value;
    this.assignedTo = this.assignedToElement.nativeElement.value;
    this.setDate();
    this.saveDataToJson();
  }

  //GET CONTACTS COMPONENTS
  getContacts() {
    console.log('get Contacts');
  }

  //LOG PRIORITY
  setPrio(prio: string) {
    this.priority = prio;
  }

  //SET CREATION TIME
  setDate() {
    var date = new Date().getTime();
    this.createdAt = date;
  }

  //CREATE SUBTASK
  addSubTask() {
    this.subInput = this.subInputElement.nativeElement.value;
    this.subtasks = this.subtasksElement.nativeElement.value;
    if (this.subInput === '') {
      console.log('error');
    } else {
      this.subtasks;
      this.addSubTask_Template();

    }
    this.subInputElement.nativeElement.value = '';
  }

  addSubTask_Template() {
    console.log('subTask created');
    return `<div class="_2">
    <input type="checkbox">
    <label for="checkbox">Subtask 2</label>
    </div>`;
  }

  //CLEAR ALL INPUT.VALUES
  clearAllValues() {
    this.titleElement.nativeElement.value = '';
    this.descripitionElement.nativeElement.value = '';
    this.categoryElement.nativeElement.value = '';
    this.assignedToElement.nativeElement.value = '';
    this.dueDateElement.nativeElement.value = '';
    this.priority = '';
    this.subInputElement.nativeElement.value = '';
    this.subtasks = '';
  }

  //SAVE DATA TO JSON FILE
  saveDataToJson() {
    var obj = {
      title: this.title,
      description: this.description,
      category: this.category,
      assignedTo: this.assignedTo,
      dueDate: this.dueDate,
      priority: this.priority,
      subtasks: this.subtasks,
      createdAt: this.createdAt,
    }

    const tasksInJson = JSON.stringify(obj);
    console.log(tasksInJson);
  }

  //CREATE NEW TASK
  createTask() {
    this.saveDataToJson();
    console.log('task created');
    this.clearAllValues();
  }

  
}
