import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.class';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss']
})
export class DialogAddTaskComponent implements OnInit {

  @Input() task: Task | any;

  contactForm = new FormControl('');

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

  taskCreated = true;

  titel: string = 'alert';
  //INPUT FIELDS
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

  newTask = new Task();

  allContacts$: Observable<any>;

  @ViewChild('title', { static: true }) titleElement: ElementRef;
  @ViewChild('description', { static: true }) descriptionElement: ElementRef;
  @ViewChild('category', { static: true }) categoryElement: ElementRef;
  @ViewChild('dropdown', { static: true }) dropdown: ElementRef;
  @ViewChild('assignedContacts', { static: true }) assignedContacts: ElementRef;
  @ViewChild('dueDate', { static: true }) dueDateElement: ElementRef;
  @ViewChild('subInput', { static: true }) subInputElement: ElementRef;
  @ViewChild('subtasks', { static: true }) subtasksElement: ElementRef;

  constructor(
    private firestore: Firestore,
    titleElement: ElementRef,
    descriptionElement: ElementRef,
    categoryElement: ElementRef,
    dueDateElement: ElementRef,
    subInputElement: ElementRef,
    substasksElement: ElementRef,
    assignedContactsElement: ElementRef,
    dropdown: ElementRef,
    public dataService: DataService,
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialogRef<DialogAddTaskComponent>,
    ) {
    this.titleElement = titleElement;
    this.descriptionElement = descriptionElement;
    this.categoryElement = categoryElement;
    this.dueDateElement = dueDateElement;
    this.subInputElement = subInputElement;
    this.subtasksElement = substasksElement;
    this.assignedContacts = assignedContactsElement;
    this.dropdown = dropdown;
    const coll = collection(firestore, 'allContacts');
    this.allContacts$ = collectionData(coll);
    this.allContacts$.subscribe(() => {
      console.log(this.allContacts$);
    });
  }

  ngOnInit(): void { }

  // EXIT ADD TASK DIALOG
  close() {
    this.dialog.close();
  }

  //ADD TASK TO LOCAL STORAGE
  addTask() {
    this.getAllInputs();
    if (this.taskCreated === true) {
      this.setId();
      this.setDate();
      this.saveTaskToFirestore();
      this.clearAllValues();
      console.log('task is created', this.taskCreated);
      this.dialogRef.close();
    } else {
      console.log('something wrong');
    }
  }

  //SET TASK ID
  setId() {
    var id = new Date().getTime();
    this.newTask.id = id / 1000000000;
  }

  //SET CREATION TIME
  setDate() {
    var date = new Date().getTime();
    this.newTask.createdAt = date;
  }

  //LOG PRIORITY
  setPrio(prio: string) {
    this.newTask.priority = prio;
    console.log(this.newTask.priority)
  }

  //CREATE SUBTASK
  addSubTask() {
    this.subTaskCreationStatus = 'sub created';
    console.log(this.subTaskCreationStatus, this.addSubInput);
    this.addedSubTasks.push(this.addSubInput);
    this.addSubInput = '';
  }

  //GET TASK INPUTS
  getAllInputs() {
    this.newTask.title = this.titleElement.nativeElement.value;
    this.newTask.description = this.descriptionElement.nativeElement.value;
    this.newTask.category = this.categoryElement.nativeElement.value;
    this.newTask.dueDate = this.dueDateElement.nativeElement.value;
    this.newTask.assignedTo = this.assignedCollegues;//this.assignedContacts.nativeElement.value 
    this.newTask.subtasks = this.addedSubTasks;

    console.log(this.categoryElement.nativeElement.value);
    if (this.titleElement.nativeElement.value === '' || this.categoryElement.nativeElement.value === '') {
      this.taskCreated = false;
      console.log('Please enter infos', this.titleElement.nativeElement.value);
    } else if (this.titleElement.nativeElement.value.length >= 1) {
      this.taskCreated = true;
    }
  }

  //DISPLAYS ALL CREATED SUBTASKS
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

  saveTaskToFirestore() {
    const coll = collection(this.firestore, 'allTasks');
    setDoc(doc(coll), this.newTask.toJSON());
    // s = UNIQUE ID
  }
}
