import { Injectable } from '@angular/core';
import { Contact } from 'src/app/models/contact.class';
import { ActivatedRoute, RouterState } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  allTasks: Task[] = [];
  taskId: any;
  contactList: Contact[] = [];
  id: string;
  constructor(
    private route: ActivatedRoute,
  ) {
  }

  getRouteParamsOfTasks() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('route params:', this.id);


    this.route.paramMap.subscribe(paramMap => {
      this.taskId = paramMap.get('id');

      console.log('the task id is', this.taskId);

    });
  }
}