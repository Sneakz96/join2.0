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

  user = new Contact();
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
      'firstName': new FormControl(this.user.firstName),
      'lastName': new FormControl(this.user.lastName),
      'email': new FormControl(this.user.email),
      'phone': new FormControl(this.user.phone),
    });
  }

  // GIVE NEW USER RANDOM ID
  setUserID() {
    this.user.id = 20000 * Math.random();
  }

  // CHECK SENDED USER FORM (ADD USER)
  checkForm() {
    let { firstName, lastName, email, phone } = this.contactForm.value;
    let formattedFirstName = this.capitalizeFirstLetter(firstName.trim());
    let formattedLastName = this.capitalizeFirstLetter(lastName.trim());
    let isFirstNameValid = this.isValidInput(formattedFirstName) && formattedFirstName.length >= 3;
    let isLastNameValid = this.isValidInput(formattedLastName) && formattedLastName.length >= 3;
    let isEmailValid = this.isValidEmail(email.trim());
    let isNumberValid = this.isValidNumber(phone.trim());

    if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isNumberValid) {
      console.error('Error: Invalid input');
      return;
    }
    this.user.firstName = formattedFirstName;
    this.user.lastName = formattedLastName;
    this.user.email = email.trim();
    this.user.phone = phone.trim();
    this.setUserID();
    this.data.setColor();
    this.addUser();
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  private isValidInput(value: string): boolean {
    return /^[A-Za-z0-9+-]+$/.test(value);
  }

  private isValidEmail(value: string): boolean {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
  }

  private isValidNumber(value: string): boolean {
    return /^[0-9+/+]+$/.test(value);
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

  // SAVE NEW USER TO DB
  saveUserToFirestore() {
    let coll = collection(this.firestore, 'allContacts');
    setDoc(doc(coll), this.user.toJSON());
  }

  // CLOSE DIALOG TO CREATE NEW USER
  closeDialog() {
    this.dialogRef.close();
  }

  // CHECK FORM VALIDATION AND ADD CREATED USER TO CONTACT-LIST
  addUser() {
    this.data.contactCreated = true;
    this.saveUserToFirestore();
    this.closeDialog();
    this.router.navigate(['/kanbanboard/contacts']);
    setTimeout(() => {
      this.data.contactCreated = false;
    }, 3000);
  }
}