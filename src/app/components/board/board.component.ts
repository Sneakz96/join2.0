import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.class';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { TaskDialogComponent } from '../dialogs/task-dialog/task-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DialogAddTaskComponent } from '../dialogs/dialog-add-task/dialog-add-task.component';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {

  @Input() task: any;

  open = false;
  dueDate: any;
  tasks: any = [];



  constructor(
    public firestore: AngularFirestore,
    public dialog: MatDialog,
    public data: DataService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {

  }

  openTask(taskToOpen: any) {
    const dialogRef = this.dialog.open(TaskDialogComponent);
    dialogRef.componentInstance.taskOnDialog = taskToOpen;
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  addTask() {
    const dialogRef = this.dialog.open(DialogAddTaskComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }






  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // debugger;
    } else {
      // debugger;
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    // console.log(event.container.data);
    // console.log(event.container.id);
    console.log(event.item.data);
    console.log(event.item);
    this.changeStatusByDrop(event.item.data, event.container.id);
  }

  changeStatusByDrop(task: any, status: any) {
    // debugger;

    // console.log(task[0].customIdName);
    task.status = status;
    console.log(task.status);

    if (task.status === 'cdk-drop-list-0') {
      task.status = 'toDo';
      console.log(task);

    } else if (task.status === 'cdk-drop-list-1') {
      task.status = 'inProgress';
      this.updateTask(task, task.status);
      console.log(task);

    } else if (task.status === 'cdk-drop-list-2') {
      task.status = 'awaitingFeedback';
      this.updateTask(task, task.status);
      console.log(task);

    } else if (task.status === 'cdk-drop-list-3') {
      task.status = 'done';
      this.updateTask(task, task.status);
      console.log(task);
      this.deleteDoneTasks(task);
    }
    this.updateTask(task, task.status);
  }

  // UPDATE TASK STATUS IN DB
  updateTask(task: any, status: any) {
    // console.log(status);
    this.firestore
      .collection("allTasks")
      .doc(task.customIdName)
      .update({ status: status })
      .then(() => {
        // console.log("status updated");
      });
  }

// DELETE TASK AFTER 3 DAYS IF IT'S DONE
  deleteDoneTasks(task: any) {
    console.log('time is runnning to delete task');
    console.log(task.createdAt);
    setTimeout(() => {
      this.task = this.data.allTasks.filter(item => {
        let now = new Date();
        let diff = now.getTime() - task.createdAt.getTime();
        let days = diff / (1000 * 60 * 60 * 24);
        return days < 3;
      });
    }, 1000 * 60 * 60 * 24 * 3);
  }









  searchTasks(event: Event) {
    //GET FILTER.INPUT ELEMENT
    // let filterInput = 
    //ADD EVENTLISTENER
    //  filterInput.addEventListener('keyup', filterTasks);
    console.log()
    //GET ALL TASKS TO FILTER
    this.data.allTasks;
    console.log(this.data.allTasks.filter);

  }

















  // editTask(task: any) {
  //   const dialogRef = this.dialog.open(AddTaskComponent, {
  //     width: '100%',
  //     data: {
  //       task
  //     },
  //   });
  //   dialogRef.componentInstance.openedAsDialogEditTask = true;
  //   this.closeOverlay();
  // 
}