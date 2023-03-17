import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataService } from 'src/app/services/data.service';
import { FormControl } from '@angular/forms';
import { Contact } from 'src/app/models/contact.class';

@Component({
  selector: 'app-dialog-edit-task',
  templateUrl: './dialog-edit-task.component.html',
  styleUrls: ['./dialog-edit-task.component.scss']
})

export class DialogEditTaskComponent implements OnInit {

  task: Task;
  taskId: string;

  contactForm = new FormControl();
  selectedContacts: any[] = [];
  checkedStatus = {};

  // BOOLEANS
  low = false;
  medium = false;
  high = false;
  // checked = false;
  // selected = false;

  // 
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DialogEditTaskComponent>,
    private firestore: AngularFirestore,
    public data: DataService
  ) { }

  // 
  ngOnInit(): void {
    this.getPriority();
    this.checkAssignedContacts();
    this.check();
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
      console.log(this.task.assignedTo);
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

  // SAVE EDITED TASK TO DB
  save() {
    this.close();
    this.task.assignedTo = this.selectedContacts;
    this.firestore
      .collection('allTasks')
      .doc(this.taskId)
      .update(this.task.toJSON());
  }
}