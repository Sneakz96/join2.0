import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/models/task.class';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {

  public allTasks: Task[] = [];
  assignedContacts: [] = [];
  searchedTask: string = '';

  @Input() task: Task | any;
  @ViewChild('searchedTask', { static: true }) searchedTaskElement: ElementRef;


  constructor(searchedTaskElement: ElementRef) {
    this.searchedTaskElement = searchedTaskElement;
  }

  ngOnInit(): void {
    this.loadFromLocalStorage();
    this.filterTasks();
  }

  searchTask(event: Event) {
    console.log('search task');
    this.searchedTaskElement.nativeElement.value = '';
  }

  plusTask() {
    console.log('addTask');
  }

  loadFromLocalStorage() {
    var tasks = localStorage.getItem('tasks');
    this.allTasks = JSON.parse((tasks) || '{}');
    console.log(this.allTasks[0].assignedTo);
  }

  //DRAG AND DROP FUNCTION
  moveTo(){
    console.log('Task dragged');

  }

  filterTasks() {
    //FILTER ALL TASK ON STATUS IN WHICH SECTION THE TASK SHOULD BE
    // this.allTasks = this.allTasks.filter((task) => {
    //   return task.status === 'toDo';
    // });

    if (this.allTasks[0].status == 'toDo') {
      console.log('status is todo');

    } 

    if (this.allTasks[0].status == 'inProgress') {
  
      console.log('status is in Progress');
    }

    if (this.allTasks[0].status == 'awaitingFeedback') {
  
      console.log('status: Task is awaiting feedback');
    }

    if (this.allTasks[0].status == 'done') {
  
      console.log('status: Task is Done');
    }

  }




}