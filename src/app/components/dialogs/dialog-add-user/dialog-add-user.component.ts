import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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

  constructor(
    private router: Router,
    private firestore: Firestore,
    public data: DataService,
    public dialogRef: MatDialogRef<DialogAddUserComponent>
  ) {
  }


  ngOnInit(): void {
    this.setForm();
    this.setUserID();
  }

  // SET FORM OF NEW CONTACT
  setForm() {
    this.contactForm = new FormGroup({
      'firstName': new FormControl(this.contact.firstName, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'lastName': new FormControl(this.contact.lastName, Validators.required),
      'email': new FormControl(this.contact.email, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      'phone': new FormControl(this.contact.phone, [Validators.required, Validators.pattern('[- +()0-9]+')]),
    });
  }

  // GIVE NEW USER RANDOM ID
  setUserID() {
    this.contact.id = 20000 * Math.random();
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

  setUser() {
    this.contact.firstName = this.contactForm.value.firstName;
    this.contact.lastName = this.contactForm.value.lastName;
    this.setColor();
    this.contact.email = this.contactForm.value.email;
    this.contact.phone = this.contactForm.value.phone;
  }

  addUser() {
    this.setUser();
    this.saveUserToFirestore();
    console.log(this.data.contactCreated);//f
    this.closeDialog()
    setTimeout(() => {
      this.data.contactCreated = true;//t
      console.log(this.data.contactCreated);
    }, 500);

    console.log(this.data.contactCreated);//f

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

  // SHOULD CLEAR VALUES OF DIALOG
  clearValues() {
    console.log();
    this.contactForm.value.firstName = '';
    // this.contactForm.value.lastName;
    // this.contactForm.value.email;
    // this.contactForm.value.phone;
  }

  editTask() {
    console.log('edit');
  }


}
