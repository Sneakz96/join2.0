import { Component } from '@angular/core';
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

export class TaskDialogComponent {

  taskId = '';
  task: Task;
  done = false;
  checkedSubTasks = [];
  // 
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private router: Router,
    public data: DataService,
    private firestore: AngularFirestore,
  ) {
    this.log();
  }

  log() {
    // for (let i = 0; i < this.task.subtasks.length; i++) {
    //   const element = this.task.subtasks[i];
    //   console.log(element);
    // }
  }


  // 
  handleCheck() {
    console.log('check')
  }


  // handleChecked(i: number, event: Event) {
  //   event.stopPropagation();
  //   if (this.checkedContacts[i] == true) {
  //     this.task.assignedTo.push(this.data.allContacts[i]);
  //   } else {
  //     this.task.assignedTo.splice(this.task.assignedTo.findIndex((elem) => elem.id == this.data.allContacts[i].id), 1);
  //   }
  //   this.checkAllAssignedContacts();
  // }






  // get doneSubtasks(): number {
  //   return this.task.subtasks.filter(subtask => subtask.status).length;
  // }

  // get progressValue(): number {
  //   return (this.subtasksCompleted / this.subtasks.length) * 100;
  // }



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
        console.log("Aufgabe wurde erfolgreich gelöscht.");
        this.closeDialog();
      })
      .catch((error) => {
        console.error("Fehler beim Löschen der Aufgabe:", error);
      });
  }
}