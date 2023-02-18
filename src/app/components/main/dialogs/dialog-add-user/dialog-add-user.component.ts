import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Contact } from 'src/app/models/contact.class';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})

export class DialogAddUserComponent implements OnInit {

  contact = new Contact();
  contactForm!: FormGroup;
  userOnDialog: any;

  // 
  constructor(
    public data: DataService,
  ) { }

  // 
  ngOnInit(): void {
    this.data.setUserForm();
  }
}