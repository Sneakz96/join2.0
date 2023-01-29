import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.class';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { TaskDialogComponent } from '../dialogs/task-dialog/task-dialog.component';
import { Firestore } from '@angular/fire/firestore';
import { DialogAddTaskComponent } from '../dialogs/dialog-add-task/dialog-add-task.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {

  @Input() task: any;

  public allTasks: Task[] = [];//ARRAY FOR SORTING 

  open = false;
  dueDate: any;
  tasks: any = [];

  constructor(
    public firestore: Firestore,
    public dialog: MatDialog,
    public data: DataService,
  ) {
  }

  ngOnInit(): void {

  }

  openTask(taskToOpen: any) {
    const dialogRef = this.dialog.open(TaskDialogComponent);
    dialogRef.componentInstance.taskOnDialog = taskToOpen;
    dialogRef.afterClosed().subscribe(() => {
      // this.router.navigate(['/kanbanboard/board/'])
    });
  }

  addTask() {
    const dialogRef = this.dialog.open(DialogAddTaskComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  searchTask(event: Event) {
    console.log('search task');
  }

  sortTasksByStatus() {
    //GET OBSERVABEL IN NORMAL ARRAY
    for (let i = 0; i < this.allTasks.length; i++) {
      console.log(this.allTasks[i]);
      if (this.task.status === 'toDo') {
        console.log(this.task.status)
      }
    }
    // status = 'ToDo';

    // status = 'InProgress';

    // status = 'AwaitingFeedback';

    // status = 'Done';
  }












  filterTasks() {
    //GET FILTER.INPUT ELEMENT
    // let filterInput = 
    //ADD EVENTLISTENER
    //  filterInput.addEventListener('keyup', filterTasks);
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
  // }

  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  //   }
  // }






}