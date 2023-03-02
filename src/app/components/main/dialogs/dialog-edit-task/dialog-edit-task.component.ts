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
    this.checkAllAssignedContacts();
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
  // onChange(event: any) {
  //   console.log(event)
  //   if (event.selected == true) {
  //     this.checked = false;
  //     event.selected = false;
  //     console.log(event.selected)
  //   } else {
  //     event.selected = true;
  //     this.checked = true;
  //     console.log(event.selected)
  //   }
  // }



  checkAllAssignedContacts() {
    this.checkedContacts = [];
    for (let i = 0; i < this.data.allContacts.length; i++) {
      // this.task.assignedTo[i].selected = true; HAPPENS IN ADD TASK
      this.checkedContacts.push(this.checkAssignedContacts(i));
    }
    console.log(this.checkedContacts);
  }

  // CHECK ASSIGNED CONTACTS
  checkAssignedContacts(i: number) {
    if (this.task.assignedTo.findIndex((elem) => elem.id == this.data.allContacts[i].id) == -1) {
      return false;
    } else {
      return true;
    }
  }

  handleChecked(i: number, event: Event) {
    // debugger;
    // console.log(this.data.allContacts[i]); 
    event.stopPropagation();
    this.checkedContacts[i] = !this.checkedContacts[i];
    console.log(this.checkedContacts[i]);
    console.log('clicked number of contact in array:',i);

    if (this.checkedContacts[i] == true) {
      // debugger;
      // PUSH CONTACT TO ARRAY
      // this.data.allContacts[i].selected = true;
      console.log('choosen contact',this.data.allContacts[i + 1]);
      // this.task.assignedTo.push(this.data.allContacts[i]);
      console.log('assigned is:',this.checkedContacts[i]);
      console.log('Task assigned to',this.task.assignedTo);
    } else {
      // SPLICE CONTACT FROM ARRAY
      // this.data.allContacts[i + 1].selected = false;
      // this.task.assignedTo.splice(i, 1);
      console.log(this.task.assignedTo);
      // console.log(this.data.allContacts[i + 1]);
      console.log('', this.checkedContacts);
    }
  }
}