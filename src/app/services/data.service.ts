import { Injectable, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.class';
import { ActivatedRoute, RouterState } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class DataService implements OnInit {

  allTasks: Task[] = [];
  taskId: any;
  // contactList: Contact[] = [];
  id: string;

  allContacts = [];

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {

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