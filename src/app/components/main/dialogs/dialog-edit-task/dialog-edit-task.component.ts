import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataService } from 'src/app/services/data.service';
import { FormControl } from '@angular/forms';

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

  low = false;
  medium = false;
  high = false;
  checked = false;


  selected = false;
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

  // SAVE EDITED TASK TO DB
  save() {
    // this.updateAssignedContacts();
    console.log('save called', this.checkedContacts);
    this.close();
    // this.firestore
    //   .collection('allTasks')
    //   .doc(this.taskId)
    //   .update(this.task.toJSON());
  }

  // CLOSE EDIT DIALOG
  close() {
    this.dialogRef.close();
    this.router.navigate(['/kanbanboard/board']);
  }

  // CHECKBOX EVENT
  onChange(event: any) {
    console.log(event)
    if (event.selected == true) {
      this.checked = false;
      event.selected = false;
      console.log(event.selected)
    } else {
      event.selected = true;
      this.checked = true;
      console.log(event.selected)
    }
  }





  // CHECK ASSIGNED CONTACTS
  checkAssignedContacts() {
    console.log(this.checkedContacts);
    for (let i = 0; i < this.task.assignedTo.length; i++) {
      let element = this.task.assignedTo[i];
      element.selected = true;
      
      this.checkedContacts.push(element);
      let checkArray = this.checkedContacts[i];
      console.log(checkArray);
    }
    this.log();
  }

  log() {
    for (let i = 0; i < this.data.allContacts.length; i++) {
      let element = this.data.allContacts[i];
      console.log('log', element.firstName, this.data.allContacts[i].id,);

    }
    for (let i = 0; i < this.task.assignedTo.length; i++) {
      console.log(i, 'assignedTo:', this.checkedContacts[i].firstName, this.checkedContacts[i].id);

      if (this.checkedContacts[i].firstName == this.data.allContacts[i].firstName) {
        console.log('true');
      }

    }
    // for (let i = 0; i < this.data.allContacts.length; i++) {
    //   console.log('log', this.data.allContacts[i].selected);
    // } 
  }

  handleChecked(i: number, event: Event) {
    // debugger;
    console.log(i);
    console.log(event);
    console.log(this.task.assignedTo);
    event.stopPropagation();
    this.task.assignedTo[i].selected = !this.task.assignedTo[i].selected;
    console.log(this.task.assignedTo[i]);
  }
}