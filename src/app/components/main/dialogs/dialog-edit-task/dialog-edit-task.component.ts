import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataService } from 'src/app/services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact.class';

@Component({
  selector: 'app-dialog-edit-task',
  templateUrl: './dialog-edit-task.component.html',
  styleUrls: ['./dialog-edit-task.component.scss']
})

export class DialogEditTaskComponent implements OnInit {
  // 
  task: Task;
  taskForm!: FormGroup;
  taskId: string;
  // 
  contactForm = new FormControl();
  selectedContacts: any[] = [];
  checkedStatus = {};
  //
  low = false;
  medium = false;
  high = false;
  // 
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DialogEditTaskComponent>,
    private firestore: AngularFirestore,
    public data: DataService
  ) { }

  // 
  ngOnInit(): void {
    this.setForm();
    this.getPriority();
    this.checkAssignedContacts();
    this.check();
  }

  // SET TASK FORM
  setForm() {
    this.taskForm = new FormGroup({
      'title': new FormControl(this.task.title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z ]+$/),
      ]),
      'description': new FormControl(this.task.description, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      'dueDate': new FormControl('', [Validators.required])
    });
  }

  // CHECK IF CONTACt IS ASSIGNED
  checkAssignedContacts(): void {
    for (let contact of this.data.allContacts) {
      this.checkedStatus[contact.id] = this.isContactAssigned(contact);
    }
  }

  // RETURN BOOLEAN
  isContactAssigned(contact: Contact) {
    return this.task.assignedTo.some((assignedContact) => assignedContact.id === contact.id);
  }

  // CHECK ASSIGNED CONTACTS AND PUSH IN ARRAW TO DISPLAY ON EDIT TASK
  check() {
    for (let i = 0; i < this.task.assignedTo.length; i++) {
      let contact = this.task.assignedTo[i];
      this.selectedContacts.push(contact)
    }
  }

  // HANDLE CHECK EVENT FOR ASSIGNE CONTACT
  onContactSelected(index: number, event: Event): void {
    event.stopPropagation();
    this.checkedStatus[index] = !this.checkedStatus[index];
    this.data.allContacts[index].selected = !this.data.allContacts[index].selected;
    if (this.data.allContacts[index].selected) {
      this.selectedContacts.push(this.data.allContacts[index]);
    } else {
      let selectedContactIndex = this.selectedContacts.indexOf(this.data.allContacts[index]);
      if (selectedContactIndex !== -1) {
        this.selectedContacts.splice(selectedContactIndex, 1);
      }
    }
  }

  // GET PRIORITY OF CURRENT TASK
  getPriority() {
    if (this.task.priority == 'Low') {
      this.low = true;
      this.medium = false;
      this.high = false;
    } else if (this.task.priority == 'Medium') {
      this.low = false;
      this.medium = true;
      this.high = false;
    } else if (this.task.priority == 'Urgent') {
      this.low = false;
      this.medium = false;
      this.high = true;
    }
  }

  // CHANGE PRIORITY OF CURRENT TASK
  setPrio(prio: string) {
    this.task.priority = prio;
    this.getPriority();
  }

  // CLOSE EDIT DIALOG
  close() {
    this.dialogRef.close();
    this.router.navigate(['/kanbanboard/board']);
  }

  // VALIDATE CURRENT FORM
  validateForm(): boolean {
    return (
      this.task.title.length > 3 &&
      this.task.description.length > 3 &&
      this.task.dueDate != null &&
      this.task.dueDate != '/NaN/NaN/NaN/'
    );
  }

  // SAVE EDITED TASK TO DB
  save(): void {
    if (this.validateForm()) {
      this.close();
      this.task.assignedTo = this.selectedContacts;
      this.firestore
        .collection('allTasks')
        .doc(this.taskId)
        .update(this.task.toJSON());
    }
  }
}