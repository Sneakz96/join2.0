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

  checkedContacts: any[] = [];

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
    console.log(this.task.assignedTo);
    console.log(this.data.allContacts);
    this.checkAssignedContacts();
  }

  // 
  checkAssignedContacts() {
    this.data.allContacts$.subscribe((contacts) => {
      for (let contact of contacts) {
        let isChecked = this.isContactAssigned(contact);
        this.checkedContacts.push(isChecked);
      }
    });
  }

  // 
  isContactAssigned(contact: Contact) {
    return this.task.assignedTo.some((assignedContact) => assignedContact.id === contact.id);
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
    this.firestore
      .collection('allTasks')
      .doc(this.taskId)
      .update(this.task.toJSON());
  }
}