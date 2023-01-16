import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task.class';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {

  //BOARD ARRAYS
  public allTasks: Task[] = [];

  toDo = [];
  inProgress: [] = [];
  awatingFeedback: [] = [];
  done = [];



  assignedContacts: [] = [];
  searchedTask: string = '';

  curentDraggedElement: string[] = [];



  @Input() task: Task | any;
  @ViewChild('searchedTask', { static: true }) searchedTaskElement: ElementRef;

  // @ViewChild('todoContainer', { static: true }) todoContainer: ElementRef;
  // @ViewChild('inProgressContainer', { static: true }) inProgressContainer: ElementRef;
  // @ViewChild('awaitingFeedbackContainer', { static: true }) awaitingFeedbackContainer: ElementRef;
  // @ViewChild('doneContainer', { static: true }) doneContainer: ElementRef;

  constructor(
    searchedTaskElement: ElementRef,
    todoContainer: ElementRef,
    inProgressContainer: ElementRef,
    awaitingFeedbackContainer: ElementRef,
    doneContainer: ElementRef,
  ) {
    this.searchedTaskElement = searchedTaskElement;
    // this.todoContainer = todoContainer;
    // this.inProgressContainer = inProgressContainer;
    // this.awaitingFeedbackContainer = awaitingFeedbackContainer;
    // this.doneContainer = doneContainer;
  }

  ngOnInit(): void {
    this.loadFromLocalStorage();
    this.filterTasks();
  }

  loadFromLocalStorage() {
    var tasks = localStorage.getItem('tasks');
    this.allTasks = JSON.parse((tasks) || '{}');
    console.log(this.allTasks[0].assignedTo);
  }


  filterTasks() {

    // let toDo = this.allTasks.filter(t => t.status == 'toDo');

    // let toDoContainer = document.getElementById('toDo') as HTMLInputElement;

    // console.log(toDoContainer);

    // let inProgress = this.allTasks.filter(t => t.status == 'inProgress');
    // console.log(inProgress);

    // let awaitingFeedback = this.allTasks.filter(t => t.status == 'awaitingFeedback');
    // console.log(awaitingFeedback);

    // let done = this.allTasks.filter(t => t.status == 'done');
    // console.log(done);
  }



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
    this.searchedTaskElement.nativeElement.value = '';
  }

  plusTask() {
    console.log('addTask');
  }


  //DRAG AND DROP FUNCTION
  moveTo() {
    console.log('Task dragged');
  }

}