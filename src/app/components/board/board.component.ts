import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  //INPUT
  searchedTask: string = '';

  @ViewChild('searchedTask', { static: true }) searchedTaskElement: ElementRef;

  constructor(searchedTaskElement: ElementRef) {
    this.searchedTaskElement = searchedTaskElement;
  }

  ngOnInit(): void {
  }

  searchTask(event: Event) {
    console.log('search task');
    this.searchedTaskElement.nativeElement.value = '';
  }

  addTask() {
    console.log('addTask');
  }


}
