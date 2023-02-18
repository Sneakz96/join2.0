import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    public dialogRef: MatDialogRef<any>,
  ) { }

  // 
  ngOnInit(): void {
    this.setUserForm();
  }

  // SET FORM OF NEW CONTACT
  setUserForm() {
    this.contactForm = new FormGroup({
      'firstName': new FormControl(this.contact.firstName),
      'lastName': new FormControl(this.contact.lastName),
      'email': new FormControl(this.contact.email),
      'phone': new FormControl(this.contact.phone),
    });
  }

  // CHECK USER FORM
  checkUserForm() {
    let firstName = this.contactForm.value.firstName.replace(/\s/g, '');
    let lastName = this.contactForm.value.lastName.replace(/\s/g, '');
    let mail = this.contactForm.value.email.replace(/\s/g, '');
    let phone = this.contactForm.value.phone.replace(/\s/g, '');
    let checkInputs = (value: string): boolean => {
      let allowedCharacters = /^[A-Za-z0-9+-]+$/;
      return allowedCharacters.test(value);
    };
    let checkMail = (value: string): boolean => {
      let allowedNumbers = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return allowedNumbers.test(value);
    };
    let checkNumber = (value: string): boolean => {
      let allowedNumbers = /^[0-9+/+]+$/;
      return allowedNumbers.test(value);
    };
    let first = checkInputs(firstName);
    let last = checkInputs(lastName);
    let email = checkMail(mail);
    let number = checkNumber(phone);

    if (!first || !last || !email || !number) {
    } else {
      this.contact.firstName = firstName;
      this.contact.lastName = lastName;
      this.contact.email = mail;
      this.contact.phone = phone;
      this.data.setUserID();
      this.data.setContactColor();
      this.data.addNewUser();
    }
  }

  // CLOSE DIALOG TO CREATE NEW USER
  closeDialog() {
    this.dialogRef.close();
  }
}