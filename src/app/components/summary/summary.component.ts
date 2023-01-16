import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.class';

@Component({
  selector: 'app-summary',

  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  tasksOnBoard: string[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
