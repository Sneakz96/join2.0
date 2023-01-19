import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task.class';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { first, Observable } from 'rxjs';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { Contact } from 'src/app/models/contact.class';
import { UIService } from 'src/app/services/ui.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})

export class AddTaskComponent implements OnInit {


  dropdownList = [];
  @Input() task: Task | any;

  contactForm = new FormControl('');


  // @Input() openedAsDialogNewTask: boolean = false;
  // @Input() openedAsDialogEditTask: boolean = false;
  // @Input() openedAsDialogNewTaskContact: boolean = false;


  public allTasks: any[] = [];

  //SUBTASKS
  subTaskCreationStatus = 'no subtask created';
  addSubInput: string = '';
  addedSubTasks: string[] = [];

  //CONTACTS
  contact = new FormControl();
  selectedContacts: string[] = [];

  dropdownSettings: IDropdownSettings = {};
  dropDownForm!: FormGroup;

  assignedCollegues: string[] = [];




  //INPUT FIELDS
  id!: number;
  title: string = '';
  description: string = '';
  category: string = '';
  assignedTo: any[] = [];
  dueDate: string = '';
  priority: string = '';
  createdAt!: number;
  subtasks: string[] = [];
  subInput: string = '';

  form = new Task();

  @ViewChild('title', { static: true }) titleElement: ElementRef;
  @ViewChild('description', { static: true }) descriptionElement: ElementRef;
  @ViewChild('category', { static: true }) categoryElement: ElementRef;
  @ViewChild('dropdown', { static: true }) dropdown: ElementRef;
  @ViewChild('assignedContacts', { static: true }) assignedContacts: ElementRef;
  @ViewChild('dueDate', { static: true }) dueDateElement: ElementRef;
  @ViewChild('subInput', { static: true }) subInputElement: ElementRef;
  @ViewChild('subtasks', { static: true }) subtasksElement: ElementRef;


  constructor(
    private fb: FormBuilder,
    titleElement: ElementRef,
    descriptionElement: ElementRef,
    categoryElement: ElementRef,
    dueDateElement: ElementRef,
    subInputElement: ElementRef,
    substasksElement: ElementRef,
    assignedContactsElement: ElementRef,
    dropdown: ElementRef,
    public dataService: DataService,
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

  ngOnInit(): void {

    // this.dropdownList =[ 
    //   { item_id: 3, item_text: 'asd'},
    //   { item_id: 4, item_text: 'asd'}
    // ];
    // this.dropdownSettings = {
    //   allowSearchFilter: true,
    //   idField: 'item_id',
    //   textField: 'item_text',
    // };
    // this.dropDownForm = this.fb.group({
    //   myContacts: []
    // });
    // console.log(this.dataService.contactList[1].firstName + this.dataService.contactList[1].lastName);
  }

  //FETCH ALL INPUT.VALUES
  addTask() {
    this.setId();
    this.setDate();
    this.getAllInputs();
    this.saveDataToJson();
    this.clearAllValues();
    this.saveToLocalStorage();
  }

  setId() {
    var id = new Date().getTime();
    this.form.id = id / 1000000000;
  }

  //SET CREATION TIME
  setDate() {
    var date = new Date().getTime();
    this.form.createdAt = date;
  }

  //LOG PRIORITY
  setPrio(prio: string) {
    this.form.priority = prio;
  }

  //CREATE SUBTASK
  addSubTask() {
    this.subTaskCreationStatus = 'sub created';
    console.log(this.subTaskCreationStatus, this.addSubInput);
    this.addedSubTasks.push(this.addSubInput);
    this.addSubInput = '';
  }

  getAllInputs() {
    this.form.title = this.titleElement.nativeElement.value;
    this.form.description = this.descriptionElement.nativeElement.value;
    this.form.category = this.categoryElement.nativeElement.value;
    this.form.dueDate = this.dueDateElement.nativeElement.value;
    this.form.assignedTo = this.assignedCollegues;//this.assignedContacts.nativeElement.value 
    this.form.subtasks = this.addedSubTasks;
  }

  updateSubTask(event: any) {
    this.addSubInput = event.target.value;
  }

  //CLEAR ALL INPUT.VALUES
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

  //SAVE DATA TO JSON FILE
  saveDataToJson() {
    this.allTasks.push(this.form);
    console.log(this.form);
  }

  saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.allTasks));
  }













  onContactSelect(item: any) {
    this.selectedContacts.push(item);
    console.log('onItemSelect', this.selectedContacts);
  }
  onContactDeSelect(item: any) {
    this.selectedContacts.splice(item, 1);
    console.log('onItemDeSelect', this.selectedContacts);
  }
  // onSelectAll(items: any) {
  //   this.selectedContacts.push(items);
  //   console.log('onSelectAll', this.selectedContacts);
  // }
  // onUnSelectAll() {
  //   this.selectedContacts = [''];
  //   console.log('onUnSelectAll fires', this.selectedContacts);
  // }








}
