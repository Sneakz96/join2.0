import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { TaskDialogComponent } from '../dialogs/task-dialog/task-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DialogAddTaskComponent } from '../dialogs/dialog-add-task/dialog-add-task.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent {
  // 
  toDo: any[] = [];
  awaitingFeedback: any[] = [];
  inProgress: any[] = [];
  done: any[] = [];
  // 
  excess = false;
  dueDate: any;
  searchField = '';
  // 
  constructor(
    public firestore: AngularFirestore,
    public dialog: MatDialog,
    public data: DataService,
    public ui: UIService,
  ) {
    this.updateBoard();
  }

  // SEARCH TASK ON BOARD
  search() {
    this.data.allTasks.forEach((task) => {
      task.visible = !task.title.toLowerCase().includes(this.searchField.toLowerCase());
    });
  }

  // OPEN DIALOG
  openTask(taskToOpen: any) {
    let dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '100%',
      data: { taskToOpen }
    });
    dialogRef.componentInstance.task = taskToOpen;
    dialogRef.componentInstance.taskId = taskToOpen.customIdName;
  }

  // OPEN ADD TASK DIALOG
  addTask() {
    this.dialog.open(DialogAddTaskComponent);
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
      this.searchField = '';
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
      this.data.deleteDoneTasks(task);
    }
    this.data.updateTask(task, task.status);
    this.updateBoard();
  }

  // SORT ALL_TASKS BY THEIR STATUS
  updateBoard() {
    this.toDo = this.data.allTasks.filter(task => task.status === 'toDo');
    this.awaitingFeedback = this.data.allTasks.filter(task => task.status === 'awaitingFeedback');
    this.inProgress = this.data.allTasks.filter(task => task.status === 'inProgress');
    this.done = this.data.allTasks.filter(task => task.status === 'done');
  }
}