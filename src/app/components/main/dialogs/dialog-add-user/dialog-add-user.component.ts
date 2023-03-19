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

  user = new Contact();
  public contactForm!: FormGroup;
  userOnDialog: any;

  @Output() sideSelect = new EventEmitter<string>();

  // 
  constructor(
    private router: Router,
    private firestore: Firestore,
    public data: DataService,
    public dialogRef: MatDialogRef<DialogAddUserComponent>
  ) {
   
  }

  // 
  ngOnInit(): void {
    this.setUserForm();
    this.contactForm.valueChanges.subscribe(console.log)
  }

  // SET FORM OF NEW CONTACT
  setUserForm() {
    this.contactForm = new FormGroup({
    'firstName': new FormControl('', [Validators.required, Validators.minLength(5)], []),
    'lastName': new FormControl(this.user.lastName, [Validators.required, Validators.minLength(5)], []),
    'email': new FormControl(this.user.email, [Validators.required, Validators.email], []),
    'phone': new FormControl(this.user.phone, [Validators.required], []),
  });

}

// CHECK SENDED USER FORM (ADD USER)
checkForm() {
  let { firstName, lastName, email, phone } = this.contactForm.value;
  console.log(this.contactForm)
  console.log(firstName, lastName, email, phone)
















  // let formattedFirstName = this.data.capitalizeFirstLetter(firstName.trim());
  // let formattedLastName = this.data.capitalizeFirstLetter(lastName.trim());
  // let isFirstNameValid = this.data.isValidInput(formattedFirstName) && formattedFirstName.length >= 3;
  // let isLastNameValid = this.data.isValidInput(formattedLastName) && formattedLastName.length >= 3;
  // let isEmailValid = this.data.isValidEmail(email.trim());
  // let isNumberValid = this.data.isValidNumber(phone.trim());

  // if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isNumberValid) {
  //   console.error('Error: Invalid input');
  //   return;
  // }
  // this.user.firstName = formattedFirstName;
  // this.user.lastName = formattedLastName;
  // this.user.email = email.trim();
  // this.user.phone = phone.trim();
  // this.setUserID();
  // this.setColor();
  // console.log(this.user);
  // this.addUser();
  // this.contactForm.reset();
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
  switch (this.user.lastName.charCodeAt(0) % 6) {
    case 0:
      this.user.color = 'lightgreen'
      break;
    case 1:
      this.user.color = 'lightgrey'
      break;
    case 2:
      this.user.color = 'lightblue'
      break;
    case 3:
      this.user.color = 'rgb(203, 87, 87)'
      break;
    case 4:
      this.user.color = '#d0d046'//YELLOW
      break;
    case 5:
      this.user.color = 'orange'
      break;
    case 6:
      this.user.color = 'purple'
      break;
    case 7:
      this.user.color = 'pink'
      break;
    default:
  }
}

// CHECK FORM VALIDATION AND ADD CREATED USER TO CONTACT-LIST
addUser() {
  debugger;
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