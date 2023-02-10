import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})

export class AddTaskComponent implements OnInit {
  //CONTACTS
  contact = new FormControl();
  contactForm = new FormControl('');
  selectedContacts: string[] = [];
  dropdownSettings: IDropdownSettings = {};
  dropDownForm!: FormGroup;
  assignedCollegues: string[] = [];
// TASK
  id!: number;
  title: string = '';
  description: string = '';
  category: string = '';
  assignedTo: [] = [];
  dueDate: string = '';
  priority: string = '';
  createdAt!: number;
  subtasks: string[] = [];
  subInput: string = '';
  // SUBTASKS
  subTaskCreationStatus = 'no subtask created';
  addSubInput: string = '';
  addedSubTasks: string[] = [];

  @ViewChild('title', { static: true }) titleElement: ElementRef;
  @ViewChild('description', { static: true }) descriptionElement: ElementRef;
  @ViewChild('category', { static: true }) categoryElement: ElementRef;
  @ViewChild('dropdown', { static: true }) dropdown: ElementRef;
  @ViewChild('assignedContacts', { static: true }) assignedContacts: ElementRef;
  @ViewChild('dueDate', { static: true }) dueDateElement: ElementRef;
  @ViewChild('subInput', { static: true }) subInputElement: ElementRef;
  @ViewChild('subtasks', { static: true }) subtasksElement: ElementRef;

  // 
  constructor(
    titleElement: ElementRef,
    descriptionElement: ElementRef,
    categoryElement: ElementRef,
    dueDateElement: ElementRef,
    subInputElement: ElementRef,
    substasksElement: ElementRef,
    assignedContactsElement: ElementRef,
    dropdown: ElementRef,
    public data: DataService,
    public router: Router,
  ) {
    this.titleElement = titleElement;
    this.descriptionElement = descriptionElement;
    this.categoryElement = categoryElement;
    this.dueDateElement = dueDateElement;
    this.subInputElement = subInputElement;
    this.subtasksElement = substasksElement;
    this.assignedContacts = assignedContactsElement;
    this.dropdown = dropdown;
  }

  // 
  ngOnInit(): void { }

  // ADD TASK TO LOCAL STORAGE
  addTask() {
    this.getAllInputs();
    if (this.data.taskCreated === true) {
      this.data.setId();
      this.data.setDate();
      this.clearAllValues();
      this.data.alert = true;
      // this.data.saveTaskToFirestore();
      setTimeout(() => {
        this.router.navigate(['/kanbanboard/board']);
      }, 2500);
    }
  }

  // CREATE SUBTASK
  addSubTask() {
    this.subTaskCreationStatus = 'sub created';
    console.log(this.subTaskCreationStatus, this.addSubInput);
    this.addedSubTasks.push(this.addSubInput);
    this.addSubInput = '';
  }

  // GET TASK INPUTS
  getAllInputs() {
    this.data.newTask.title = this.titleElement.nativeElement.value;
    this.data.newTask.description = this.descriptionElement.nativeElement.value;
    this.data.newTask.category = this.categoryElement.nativeElement.value;
    this.data.newTask.dueDate = this.dueDateElement.nativeElement.value;
    this.data.newTask.assignedTo = this.assignedCollegues;
    this.data.newTask.subtasks = this.addedSubTasks;
    this.checkIfInputIsEmpty();
  }

  // CHECK EMPTY INPUTS
  checkIfInputIsEmpty() {
    if (this.titleElement.nativeElement.value === '' ||
      this.categoryElement.nativeElement.value === '' ||
      this.descriptionElement.nativeElement.value === '' ||
      this.dueDateElement.nativeElement.value === '' ||
      this.data.newTask.priority === ''
    ) {
      this.data.taskCreated = false;
      this.clearAllValues();
    } else if (this.titleElement.nativeElement.value.length >= 1 &&
      this.categoryElement.nativeElement.value.length == 1 &&
      this.data.newTask.assignedTo.length > 0
    ) {
      this.data.taskCreated = true;
    }
  }

  // DISPLAYS ALL CREATED SUBTASKS
  updateSubTask(event: any) {
    this.addSubInput = event.target.value;
  }

  // CLEAR ALL INPUT.VALUES
  clearAllValues() {
    this.titleElement.nativeElement.value = '';
    this.descriptionElement.nativeElement.value = '';
    this.categoryElement.nativeElement.value = '';
    this.assignedCollegues = [];
    this.dueDateElement.nativeElement.value = '';
    this.priority = '';
    this.subInputElement.nativeElement.value = '';
    this.addedSubTasks = [];
    this.subtasks = [];
  }
}