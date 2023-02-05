import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private router: Router,
    private route: ActivatedRoute,
    public data: DataService,
    public dialog: MatDialog,
  ) { }

  // CLOSE DIALOGAND AND NAVIGATE TO BOARD
  closeDialog() {
    this.dialogRef.close();
    this.router.navigate(['/kanbanboard/board']);
  }

  // EDIT OPENED TASK
  editTask() {
    this.dialogRef.close();
    const dialog = this.dialog.open(DialogEditTaskComponent);
    dialog.componentInstance.task = new Task(this.task);
    dialog.componentInstance.taskId = this.taskId;
  }
}