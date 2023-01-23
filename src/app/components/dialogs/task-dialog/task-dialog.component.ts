import { Component, Input, OnInit } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  taskOnDialog: any; 

  constructor(
    // private firestore: Firestore,
    public dialogRef: MatDialogRef<any>,
    private router: Router,
    public data: DataService,
  ) {

  }

  ngOnInit(): void {
    // this.getTaskData();
  }

  closeDialog() {
    this.dialogRef.close();
    // this.router.navigate(['/kanbanboard/board'])
  }

  getTaskData() {
    this.data.getRouteParamsOfTasks();
  }
}
