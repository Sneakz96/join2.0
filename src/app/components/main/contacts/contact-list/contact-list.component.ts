import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})

export class ContactListComponent implements OnInit {

  constructor(
    public dataService: DataService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {

  }


  getFirstLetterFromContact(contact: any) {
    return contact.firstName.charAt(0);
  }


  editContact() {

    console.log('open contact edit');
  }
  
  // 
  addNewContact() {
    this.router.navigate(['/kanbanboard/contacts/add-user']);
  }
}
