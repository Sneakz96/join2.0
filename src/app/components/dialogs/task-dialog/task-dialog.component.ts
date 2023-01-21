import { Component, Input, OnInit } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  taskId: any;


  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<any>,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }


  ngOnInit(): void {
    // this.taskDetails = this.route.snapshot.paramMap.get('id');
    this.route.paramMap.subscribe(paramMap => {
      this.taskId = paramMap.get(':id');

      console.log('the task id is', this.taskId);
      this.getTask();
    });

  }

  getTask() {
    
  }


  closeDialog() {
    this.dialogRef.close();
    this.router.navigate(['/kanbanboard/board'])
  }
}
