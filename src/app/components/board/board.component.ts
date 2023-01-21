import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task.class';
import { MatDialog } from '@angular/material/dialog';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataService } from 'src/app/services/data.service';
import { TaskDialogComponent } from '../dialogs/task-dialog/task-dialog.component';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {

  @Input() task: any;


  @Output() close = new EventEmitter<boolean>();

  //BOARD ARRAYS
  public allTasks: Task[] = [];

  open = false;
  dueDate: any;

  // toDo = [];
  // inProgress: [] = [];
  // awatingFeedback: [] = [];
  // done = [];
  // currentDraggedElement: string[] = [];
  // @ViewChild('searchedTask', { static: true }) searchedTaskElement: ElementRef;

  allTasks$: Observable<any>;

  constructor(
    firestore: Firestore,
    public dialog: MatDialog,
    public data: DataService,
    private router: Router,
  ) {
    // this.searchedTaskElement = searchedTaskElement;
    const coll = collection(firestore, 'allTasks');
    this.allTasks$ = collectionData(coll);
    this.allTasks$.subscribe(()=>{
      console.log(this.allTasks$);
    });
  }

  ngOnInit(): void {

    //this.changeDateAppearance();
    // setTimeout(() => {
    //   this.open = true;
    // }, 125);
  }

  openDialog() {
    const dialogRef = this.dialog.open(TaskDialogComponent);
    // this.router.navigate(['/kanbanboard/contacts'])
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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


  searchTask(event: Event) {
    console.log('search task');
    // this.searchedTaskElement.nativeElement.value = '';
  }

  plusTask() {
    console.log('addTask');
  }



}