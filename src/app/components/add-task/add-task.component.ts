import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task.class';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
// import { ContactListComponent } from './components/contact-list/contact-list.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})

export class AddTaskComponent implements OnInit {

  @Input() task: Task | any;



  public allTasks: any[] = [];

  //SUBTASKS
  subTaskCreationStatus = 'no subtask created';
  addSubInput: string = '';
  addedSubTasks: string[] = [];

  //CONTACTS
  contact = new FormControl();
  selectedContacts: string[] = [];
  contactList: string[] = ['Anna', 'Musti', 'Olivia', 'Verena', 'Peter', 'Max'];
  dropdownSettings: IDropdownSettings = {};
  dropDownForm!: FormGroup;

  //INPUT FIELDS
  id!: number;
  title: string = '';
  description: string = '';
  category: string = '';
  assignedTo: string[] = [];
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
    dropdown: ElementRef,
  ) {
    this.titleElement = titleElement;
    this.descriptionElement = descriptionElement;
    this.categoryElement = categoryElement;
    this.dueDateElement = dueDateElement;
    this.subInputElement = subInputElement;
    this.subtasksElement = substasksElement;
    this.dropdown = dropdown;
  }

  ngOnInit(): void {
    this.getContacts();
    this.dropdownSettings = {
      allowSearchFilter: true,
      // idField: 'contact_id',
      // textField: 'contact_name',
    };
    this.dropDownForm = this.fb.group({
      myContacts: [this.selectedContacts]
    });

  }

  //FETCH ALL INPUT.VALUES
  addTask() {

    this.setId();
    this.setDate();
    this.getAllInputs();
    //this.contactColorService();
    this.saveDataToJson();
    this.clearAllValues();
    this.saveToLocalStorage();
    console.log('lc storage set');
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
    this.form.assignedTo = this.selectedContacts;
    this.form.subtasks = this.addedSubTasks;



    console.log(this.selectedContacts);
    console.log(this.addedSubTasks);
  }

  //GET CONTACTS COMPONENTS
  getContacts() {
    this.assignedTo = this.selectedContacts;

  }

  updateSubTask(event: any) {
    this.addSubInput = event.target.value;
  }

  //CLEAR ALL INPUT.VALUES
  clearAllValues() {
    this.titleElement.nativeElement.value = '';
    this.descriptionElement.nativeElement.value = '';
    this.categoryElement.nativeElement.value = '';


    //this.dropdown.nativeElement.value = '';


    this.selectedContacts = [''];

    this.dueDateElement.nativeElement.value = '';
    this.priority = '';

    this.subInputElement.nativeElement.value = '';
    this.addedSubTasks = [''];
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
  onSelectAll(items: any) {
    this.selectedContacts.push(items);
    console.log('onSelectAll', this.selectedContacts);
  }
  onUnSelectAll() {
    this.selectedContacts = [''];
    console.log('onUnSelectAll fires', this.selectedContacts);
  }



  contactColorService() {
    // SHOULD SELECT COLOR OF CIRCLE
    // this.contacts.lastName.charAt(0) = firstLetter;

    // if (this.firstLetter == 'b, g, s, y') {
    // yellow
    // }

    // if (this.firstLetter ==  'h, n, t, z ') {
    // orange
    // }

    // if (this.firstLetter == 'c, u, i, o') {
    // red
    // }

    // if (this.firstLetter == 'd, k, p, v') {
    // blue
    // }

    // if (this.firstLetter == 'e, q, w') {
    // green
    // }

    // if (this.firstLetter == 'f, l, r, x') {
    // purple
    // }

    // if (this.firstLetter == 'a, m, j') {
    // grey
    // }


  }
}
