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
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DialogEditTaskComponent>,
    private firestore: AngularFirestore,
    public data: DataService,
  ) { }

  // 
  ngOnInit(): void {
    console.log(this.task);
    console.log(this.taskId);
    this.getPriority();
  }

  // 
  getPriority() {
    console.log(this.task.priority);
    console.log(low);
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
