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

}
