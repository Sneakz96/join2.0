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

  // CHECK SENDED USER FORM (ADD USER)
  checkForm() {
    let firstName = this.contactForm.value.firstName.trim();
    let lastName = this.contactForm.value.lastName.trim();
    let email = this.contactForm.value.email.trim();
    let phone = this.contactForm.value.phone.trim();
  
    // Ersten Buchstaben von Vor- und Nachnamen groß schreiben
    let capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
  
    let formattedFirstName = capitalizeFirstLetter(firstName);
    let formattedLastName = capitalizeFirstLetter(lastName);
  
    let isValidInput = (value) => {
      let allowedCharacters = /^[A-Za-z0-9+-]+$/;
      return allowedCharacters.test(value);
    };
  
    let isValidEmail = (value) => {
      let allowedEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return allowedEmailFormat.test(value);
    };
  
    let isValidNumber = (value) => {
      let allowedNumbers = /^[0-9+/+]+$/;
      return allowedNumbers.test(value);
    };
  
    let isFirstNameValid = isValidInput(formattedFirstName) && formattedFirstName.length >= 3;
    let isLastNameValid = isValidInput(formattedLastName) && formattedLastName.length >= 3;
    let isEmailValid = isValidEmail(email);
    let isNumberValid = isValidNumber(phone);
  
    if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isNumberValid) {
      console.log('error'); // Output: false
      console.log(isFirstNameValid, isLastNameValid, isEmailValid, isNumberValid); // Output: false
    } else {
      console.log('it works', this.contact.selected); // Output: false
      console.log(isFirstNameValid, isLastNameValid, isEmailValid, isNumberValid); // Output: false
      this.contact.firstName = formattedFirstName;
      this.contact.lastName = formattedLastName;
      this.contact.email = email;
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
        this.contact.color = '#02CF2F'
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
    let coll = collection(this.firestore, 'allContacts');
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
    let firstName = document.getElementById("firstName") as HTMLInputElement;
    let lastName = document.getElementById("lastName") as HTMLInputElement;
    let mail = document.getElementById("mail") as HTMLInputElement;
    let phone = document.getElementById("phone") as HTMLInputElement;
    firstName.value = '';
    lastName.value = '';
    mail.value = '';
    phone.value = '';
  }
}