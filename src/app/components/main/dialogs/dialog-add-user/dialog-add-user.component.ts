import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  // 
  user = new Contact();
  contactForm!: FormGroup;
  userOnDialog: any;
  // 
  lastName = false;
  email = false;
  phone = false;
  // 
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
      'firstName': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
        Validators.pattern(/^[a-zA-Z]+$/)]),
      'lastName': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
        Validators.pattern(/^[a-zA-Z]+$/)]),
      'email': new FormControl('', [
        Validators.required,
        Validators.email], []),
      'phone': new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+?\d{6,}$/)
      ]),
    });
  }

  // CHECK SENDED USER FORM (ADD USER)
  checkForm() {
    let { firstName, lastName, email, phone } = this.contactForm.value;
    let formattedFirstName = this.data.capitalizeFirstLetter(firstName.trim());
    let formattedLastName = this.data.capitalizeFirstLetter(lastName.trim());
    this.checkInputs();
    if (this.contactForm.valid) {

      this.user.firstName = formattedFirstName;
      this.user.lastName = formattedLastName;
      this.user.email = email.trim();
      this.user.phone = phone.trim();

      this.setUserID();
      this.setColor();
      this.addUser();

      this.contactForm.reset();
    }
  }

  // 
  checkInputs() {
    if (this.contactForm.value.lastName == '') {
      this.lastName = true;
    }
    if (this.contactForm.value.email == '') {
      this.email = true;
    }
    if (this.contactForm.value.phone == '') {
      this.phone = true;
    }
    this.timeout();
  }

  // TIMEOUT
  timeout() {
    setTimeout(() => {
      this.lastName = false;
      this.email = false;
      this.phone = false;
    }, 3000)
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

  // GIVE NEW USER RANDOM ID
  setUserID() {
    this.user.id = 20000 * Math.random();
  }

  // SET BG_COLOR OF CIRCLE BY FIRST LETTER OF LAST NAME
  setColor() {
    let colors = ['lightgreen', 'lightgrey', 'lightblue', 'rgb(203, 87, 87)', '#d0d046', 'orange', 'purple', 'pink'];
    let charCode = this.user.lastName.charCodeAt(0);
    let colorIndex = charCode % colors.length;
    this.user.color = colors[colorIndex];
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