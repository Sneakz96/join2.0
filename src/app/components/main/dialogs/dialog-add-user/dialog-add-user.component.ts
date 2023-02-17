import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
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

  @Output() sideSelect = new EventEmitter<string>();

  // 
  constructor(
    private router: Router,
    private firestore: Firestore,
    public data: DataService,
    public dialogRef: MatDialogRef<DialogAddUserComponent>
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

  // GIVE NEW USER RANDOM ID
  setUserID() {
    this.contact.id = 20000 * Math.random();
  }

  // SET USER FORM
  checkForm() {
    let firstName = this.contactForm.value.firstName.replace(/\s/g, '');
    let lastName = this.contactForm.value.lastName.replace(/\s/g, '');
    let mail = this.contactForm.value.email.replace(/\s/g, '');
    let phone = this.contactForm.value.phone.replace(/\s/g, '');

    const checkInputs = (value: string): boolean => {
      const allowedCharacters = /^[A-Za-z0-9+-]+$/;
      return allowedCharacters.test(value);
    };

    const checkMail = (value: string): boolean => {
      const allowedNumbers = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return allowedNumbers.test(value);
    };

    const checkNumber = (value: string): boolean => {
      const allowedNumbers = /^[0-9+/+]+$/;
      return allowedNumbers.test(value);
    };

    let first = checkInputs(firstName);
    let last = checkInputs(lastName);
    let email = checkMail(mail);
    let number = checkNumber(phone);

    if (!first || !last || !email || !number) {
      console.log('error'); // Output: false
      console.log(first, last, email, number); // Output: false
    } else {
      console.log('it works', this.contact.selected); // Output: false
      console.log(first, last, email, number); // Output: false
      this.contact.firstName = firstName;
      this.contact.lastName = lastName;
      this.contact.email = mail;
      this.contact.phone = phone;
      this.setUserID();
      this.setColor();
      this.addUser();
    }
  }

  // SET BG_COLOR OF CIRCLE BY FIRST LETTER OF LAST NAME
  setColor() {
    switch (this.contact.lastName.charCodeAt(0) % 6) {
      case 0:
        this.contact.color = 'lightgreen'
        break;
      case 1:
        this.contact.color = 'lightgrey'
        break;
      case 2:
        this.contact.color = 'lightblue'
        break;
      case 3:
        this.contact.color = 'red'
        break;
      case 4:
        this.contact.color = 'yellow'
        break;
      case 5:
        this.contact.color = 'orange'
        break;
      case 6:
        this.contact.color = 'purple'
        break;
      case 7:
        this.contact.color = 'pink'
        break;
      default:
    }
  }

  // SAVE NEW USER TO DB
  saveUserToFirestore() {
    const coll = collection(this.firestore, 'allContacts');
    setDoc(doc(coll), this.contact.toJSON());
  }

  // CLOSE DIALOG TO CREATE NEW USER
  closeDialog() {
    this.dialogRef.close();
  }

  // CHECK FORM VALIDATION AND ADD CREATED USER TO CONTACT-LIST
  addUser() {
    console.log('user added called', this.contact);
    this.data.contactCreated = true;
    this.saveUserToFirestore();
    this.closeDialog();
    this.router.navigate(['/kanbanboard/contacts']);
    setTimeout(() => {
      this.data.contactCreated = false;
    }, 3000);
  }

  // SHOULD CLEAR VALUES OF DIALOG
  clearValues() {
    const firstName = document.getElementById("firstName") as HTMLInputElement;
    const lastName = document.getElementById("lastName") as HTMLInputElement;
    const mail = document.getElementById("mail") as HTMLInputElement;
    const phone = document.getElementById("phone") as HTMLInputElement;
    firstName.value = '';
    lastName.value = '';
    mail.value = '';
    phone.value = '';
  }

  // CLOSE DIALOG
  close() {

  }
}