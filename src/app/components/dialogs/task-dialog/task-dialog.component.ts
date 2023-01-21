import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>) { }


  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
