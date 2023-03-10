import { Component } from '@angular/core';
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

  // 
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private router: Router,
    public data: DataService,
    ) { }

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
}