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

  // CHECK SENDED USER FORM (ADD USER)
  checkForm() {
    let { firstName, lastName, email, phone } = this.contactForm.value;
    let formattedFirstName = this.data.capitalizeFirstLetter(firstName.trim());
    let formattedLastName = this.data.capitalizeFirstLetter(lastName.trim());
    let isFirstNameValid = this.data.isValidInput(formattedFirstName) && formattedFirstName.length >= 3;
    let isLastNameValid = this.data.isValidInput(formattedLastName) && formattedLastName.length >= 3;
    let isEmailValid = this.data.isValidEmail(email.trim());
    let isNumberValid = this.data.isValidNumber(phone.trim());

    if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isNumberValid) {
      console.error('Error: Invalid input');
      return;
    }
    this.user.firstName = formattedFirstName;
    this.user.lastName = formattedLastName;
    this.user.email = email.trim();
    this.user.phone = phone.trim();
    this.data.setUserID();
    this.data.setColor();
    this.addUser();
    this.contactForm.reset();
  }

  // SHOULD CLEAR VALUES OF DIALOG
  clearValues() {
    this.contactForm.reset();
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
    this.data.allContacts = [];
    this.data.loadContacts();
    this.saveUserToFirestore();
    this.clearValues();
    this.closeDialog();
    this.router.navigate(['/kanbanboard/contacts']);
    setTimeout(() => {
      this.data.contactCreated = false;
    }, 3000);
  }
}