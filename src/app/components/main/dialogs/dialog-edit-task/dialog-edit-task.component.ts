import { Component, ElementRef, InjectionToken, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataService } from 'src/app/services/data.service';
import { FormControl } from '@angular/forms';
import { MatCheckboxDefaultOptions } from '@angular/material/checkbox';

@Component({
  selector: 'app-dialog-edit-task',
  templateUrl: './dialog-edit-task.component.html',
  styleUrls: ['./dialog-edit-task.component.scss']
})

export class DialogEditTaskComponent implements OnInit {

  task: Task;
  taskId: string;
  // 
  contactForm = new FormControl();
  assignedCollegues: string[] = [];
  // 
  low = false;
  medium = false;
  high = false;
  checked = false;
  // 
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DialogEditTaskComponent>,
    private firestore: AngularFirestore,
    public data: DataService,
    assignedContactsElement: ElementRef,
  ) {
    // this.assignedContacts = assignedContactsElement;
  }

  // 
  ngOnInit(): void {
    console.log('init called')
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
    console.log(this.task.priority)
    this.getPriority();
  }

  // SAVE EDITED TASK TO DB
  save() {
    console.log('save called');
    this.close();
    this.firestore
      .collection('allTasks')
      .doc(this.taskId)
      .update(this.task.toJSON());
  }

  // CLOSE EDIT DIALOG
  close() {
    this.dialogRef.close();
    this.router.navigate(['/kanbanboard/board']);
  }














  // 
  checkAssignedContacts() {
    // console.log(this.task.assignedTo[0].selected);
    // console.log(this.assignedCollegues);
    for (let i = 0; i < this.task.assignedTo.length; i++) {
      let element = this.task.assignedTo[i];
      console.log('Assigned to:', element);
      element.selected = true;
      // console.log('Service:',this.data.allContacts[i]); 
      this.assignedCollegues.push(element.id);
    }
    console.log(this.assignedCollegues);
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




  @ViewChild('assignedContacts', { static: true }) assignedContacts: ElementRef;

  // assignedTo: [] = [];
  // assignedCollegues: string[] = [];    double







  updateAssignedContacts() {
    let input = document.getElementById("collegueMenu").innerText;
    this.task.assignedTo;
    this.assignedCollegues;
    console.log('test:', input);
    console.log('test:', this.task.assignedTo);
    console.log('test:', this.assignedCollegues);
  }
}