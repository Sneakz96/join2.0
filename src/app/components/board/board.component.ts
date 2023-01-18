import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task.class';
import { MatDialog } from '@angular/material/dialog';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AddTaskComponent } from '../add-task/add-task.component';
import { Contact } from 'src/app/models/contact.class';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {

  @Input() task: any;
  @Input() contact!: string[];

  @Output() close = new EventEmitter<boolean>();

  //BOARD ARRAYS
  public allTasks: Task[] = [];

  open = false;
  dueDate: any;

  // toDo = [];
  // inProgress: [] = [];
  // awatingFeedback: [] = [];
  // done = [];
  // curentDraggedElement: string[] = [];
  // @ViewChild('searchedTask', { static: true }) searchedTaskElement: ElementRef;

  constructor(public dialog: MatDialog) {
    // this.searchedTaskElement = searchedTaskElement;
  }

  ngOnInit(): void {
    this.loadFromLocalStorage();
    //this.changeDateAppearance();
    // setTimeout(() => {
    //   this.open = true;
    // }, 125);
  }

  loadFromLocalStorage() {
    var tasks = localStorage.getItem('tasks');
    this.allTasks = JSON.parse((tasks) || '{}');
    console.log(this.allTasks[0].assignedTo);
    // console.log(this.allTasks[0].assignedTo[0].charAt(0));
   
  }

  // changeDateAppearance() {
  //   let date = new Date(this.task.dueDate.date);
  //   let day = date.getDate();
  //   let month = date.getMonth() + 1;
  //   let year = date.getFullYear();
  //   this.dueDate = day + '.' + month + '.' + year;
  // }

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

  // closeOverlay() {
  //   this.close.emit();
  // }

  // stopProp(event: any) {
  //   event.stopPropagation();
  // }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

 










  searchTask(event: Event) {
    console.log('search task');
    // this.searchedTaskElement.nativeElement.value = '';
  }

  plusTask() {
    console.log('addTask');
  }


  //DRAG AND DROP FUNCTION
  moveTo() {
    console.log('Task dragged');
  }

}