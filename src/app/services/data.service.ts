import { Injectable } from '@angular/core';
import { Contact } from 'src/app/models/contact.class';

@Injectable({
  providedIn: 'root'
})

export class DataService {



  contactList: Contact[] = [
    {
      id: 1,
      firstName: 'Alf',
      lastName: 'Dalf',
      email: 'Alf@alf.de',
      phone: 'string',
      color: ''
    },
    {
      id: 2,
      firstName: 'Iris',
      lastName: 'Dadera',
      email: 'irisC@gmail.de',
      phone: '22020202000',
      color: ''
    },
    {
      id: 3,
      firstName: 'Rocco',
      lastName: 'Siffredi',
      email: 'roccoF@gmail.com',
      phone: '22020202000',
      color: ''
    },
    {
      id: 4,
      firstName: 'Peter',
      lastName: 'Zwegat',
      email: 'Peter.Zw@hotmail.com',
      phone: '22020202000',
      color: ''
    },
    {
      id: 5,
      firstName: 'Houben',
      lastName: 'Lunar',
      email: 'hulu@gmail.com',
      phone: '22020202000',
      color: ''
    },
    {
      id: 6,
      firstName: 'Firas',
      lastName: 'Waty',
      email: 'FWaaty@gmail.com',
      phone: '22020202000',
      color: ''
    }
  ];

  constructor() {
    //this.contactColorService();
    this.setColor();
    this.sortContacts();
  }

  sortContacts() {
    this.contactList.sort((a, b) => a.firstName.localeCompare(b.firstName))
}

  // SHOULD SET COLOR OF CIRCLE
  setColor() {
    for (let i = 0; i < this.contactList.length; i++) {
      switch (this.contactList[i].lastName.charCodeAt(0) % 6) {
        case 0:
          this.contactList[i].color = 'lightgreen'
          break;
        case 1:
          this.contactList[i].color = 'lightgrey'
          break;
        case 2:
          this.contactList[i].color = 'lightblue'
          break;
        case 3:
          this.contactList[i].color = 'red'
          break;
        case 4:
          this.contactList[i].color = 'yellow'
          break;
        case 5:
          this.contactList[i].color = 'orange'
          break;
        case 6:
          this.contactList[i].color = 'purple'
          break;
        case 7:
          this.contactList[i].color = 'pink'
          break;
        default:
      }
    }
  }

}