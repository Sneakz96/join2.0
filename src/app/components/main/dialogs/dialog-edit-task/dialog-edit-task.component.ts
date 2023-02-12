import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dialog-edit-task',
  templateUrl: './dialog-edit-task.component.html',
  styleUrls: ['./dialog-edit-task.component.scss']
})

export class DialogEditTaskComponent implements OnInit {

  task: Task;
  taskId: string;

  // 
  low = false;
  medium = false;
  high = false;

  // 
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DialogEditTaskComponent>,
    private firestore: AngularFirestore,
    public data: DataService,
  ) { }

  // 
  ngOnInit(): void {
    this.getPriority();
  }

  // 
  getPriority() {
    if (this.task.priority == 'Low') {
      this.low = true;
      console.log(this.low);
    } else if (this.task.priority == 'Medium') {
      this.medium = true;
      console.log(this.medium);
    } else if (this.task.priority == 'Urgent') {
      this.high = true;
      console.log(this.high);
    }
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

  // CLOSE DIALOG
  close() {
    this.dialogRef.close();
    this.router.navigate(['/kanbanboard/board']);
  }
}
