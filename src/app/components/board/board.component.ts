import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { TaskDialogComponent } from '../dialogs/task-dialog/task-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DialogAddTaskComponent } from '../dialogs/dialog-add-task/dialog-add-task.component';
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

  searchField: string;


  constructor(
    public firestore: AngularFirestore,
    public dialog: MatDialog,
    public data: DataService,
  ) { }


  ngOnInit(): void {
    console.log();
  }

  // 
  openTask(taskToOpen: any) {
    const dialogRef = this.dialog.open(TaskDialogComponent);
    dialogRef.componentInstance.taskOnDialog = taskToOpen;
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  // OPEN ADD TASK DIALOG
  addTask() {
    const dialogRef = this.dialog.open(DialogAddTaskComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // DRAG AND DROP FUNCTION
  drop(event: CdkDragDrop<any>) {

    let index = event.currentIndex;
    let indexBefore = event.previousIndex;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, indexBefore, index);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        indexBefore,
        index
      );
      this.changeStatusByDrop(event.item.data, event.container.id);
    }
  }

  // CHANGE TASK STATUS BY DROP IN CONTAINERS
  changeStatusByDrop(task: any, status: any) {
    if (status === 'dropList_0') {
      task.status = 'toDo';
    } else if (status === 'dropList_1') {
      task.status = 'inProgress';
    } else if (status === 'dropList_2') {
      task.status = 'awaitingFeedback';
    } else if (status === 'dropList_3') {
      task.status = 'done';
      this.deleteDoneTasks(task);
    }
    this.updateTask(task, task.status);
  }

  // UPDATE TASK STATUS IN DB
  updateTask(task: any, status: any) {
    this.firestore
      .collection("allTasks")
      .doc(task.customIdName)
      .update({ status: status });
  }

  // DELETE TASK AFTER 3 DAYS IF IT'S DONE
  deleteDoneTasks(task: any) {
    setTimeout(() => {
      this.task = this.data.allTasks.filter(item => {
        let now = new Date();
        let diff = now.getTime() - task.createdAt.getTime();
        let days = diff / (1000 * 60 * 60 * 24);
        return days < 3;
      });
    }, 1000 * 60 * 60 * 24 * 3);
  }









  searchTasks() {


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