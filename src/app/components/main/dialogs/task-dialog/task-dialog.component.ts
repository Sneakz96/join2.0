import { Component, Input, OnInit } from '@angular/core';
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
export class TaskDialogComponent implements OnInit {

  taskId = '';
  task: Task;

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private router: Router,
    private route: ActivatedRoute,
    public data: DataService,
    public dialog: MatDialog,
  ) {

  }


  ngOnInit(): void {
    console.log('task:', this.task);
    // this.getParams();
  }

  // // 
  // getParams() {
  //   this.route.paramMap.subscribe(paramMap => {
  //     this.taskId = paramMap.get('id');
  //     console.log(this.route);
  //     this.getCurrentTask();
  //   });
  // }

  // // LOAD CURRENT TASK FROM DB
  // getCurrentTask() {
  //   this.firestore
  //     .collection('allTasks')
  //     .doc(this.taskId)
  //     .valueChanges()
  //     .subscribe((task: any) => {
  //       this.task = new Task(task);
  //     });
  //   console.log(this.task);
  // }

  closeDialog() {
    this.dialogRef.close();
    this.router.navigate(['/kanbanboard/board']);
  }

  editTask() {
    const dialogRef = this.dialog.open(DialogEditTaskComponent);
    dialogRef.componentInstance.task = new Task(this.task);
    dialogRef.componentInstance.taskId = this.taskId;
    console.log(this.task);
    console.log(this.taskId);
  }
}