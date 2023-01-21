import { Injectable } from '@angular/core';
import { Contact } from 'src/app/models/contact.class';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  allTasks: Task[] = [];

  contactList: Contact[] = [];

  constructor() {

  }

}