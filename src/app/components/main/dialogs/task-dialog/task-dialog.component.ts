import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.class';
import { DataService } from 'src/app/services/data.service';
import { DialogEditTaskComponent } from '../dialog-edit-task/dialog-edit-task.component';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})

export class TaskDialogComponent implements OnInit {
  // 
  taskId = '';
  task: Task;
  done = false;
  checkedSubTasks: any = [];
  // 
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private router: Router,
    public data: DataService,
    private firestore: AngularFirestore,
  ) { }

  // 
  ngOnInit(): void {
    this.checkCheckedUsers();
  }

  // 
  checkCheckedUsers() {
    for (let i = 0; i < this.task.subtasks.length; i++) {
      if (this.task.subtasks[i].done) {
        this.checkedSubTasks.push(this.task.subtasks[i]);
      }
    }
  }

  // HANDLE CHECK EVENT OF SUBTASKS
  handleCheck(i: number, event: Event) {
    event.stopPropagation();
    this.task.subtasks[i].done = !this.task.subtasks[i].done;

    // Update the checkedSubTasks array
    if (this.task.subtasks[i].done) {
      this.checkedSubTasks.push(this.task.subtasks[i]);
    } else {
      let index = this.checkedSubTasks.indexOf(this.task.subtasks[i]);
      if (index !== -1) {
        this.checkedSubTasks.splice(index, 1);
      }
    }

    let updatedTask = {
      title: this.task.title,
      description: this.task.description,
      subtasks: this.task.subtasks
    };
    this.data.updateTaskInFirebase(this.taskId, updatedTask);
  }

  // CLOSE DIALOG AND AND NAVIGATE TO BOARD
  closeDialog() {
    this.dialogRef.close();
    this.router.navigate(['/kanbanboard/board']);
  }

  // EDIT OPENED TASK
  editTask() {
    this.dialogRef.close();
    let dialog = this.dialog.open(DialogEditTaskComponent);
    dialog.componentInstance.task = new Task(this.task);
    dialog.componentInstance.taskId = this.taskId;
    this.closeDialog();
  }

  // DELETE TASK ON OVERLAY
  deleteTask(taskId: any) {
    this.firestore.collection("allTasks").doc(taskId).delete()
      .then(() => {
        this.closeDialog();
      })
      .catch(() => {
        alert("Fehler beim Löschen der Aufgabe!");
      });
  }
}