import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact.class';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})

export class DialogEditUserComponent implements OnInit {
  // 
  user: Contact;
  userId: string;
  userForm: FormGroup;
  userEdited = false;
  // 
  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private firestore: AngularFirestore,
    public data: DataService,
  ) { }

  // 
  ngOnInit(): void {
    this.setUserForm();
    this.userForm.valueChanges.subscribe(console.log);
  }

  // 
  setUserForm() {
    this.userForm = new FormGroup({
      'firstName': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z]+$/)
      ]),
      'lastName': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z]+$/)
      ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'phone': new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+?\d{6,}$/)
      ])
    });
  }

  // CLOSE DIALOG
  closeDialog() {
    this.dialogRef.close();
  }

  // SAVE EDITED USER TO DB
  save() {
    this.checkEditedForm();
    if (this.userEdited) {
      this.setColor();
      this.data.allContacts = [];
      this.data.loadContacts();
      this.closeDialog();
      this.firestore
        .collection('allContacts')
        .doc(this.userId)
        .update(this.user.toJSON());
    }
  }

  // SET BG_COLOR OF CIRCLE BY FIRST LETTER OF LAST NAME
  setColor() {
    let colors = ['lightgreen', 'lightgrey', 'lightblue', 'rgb(203, 87, 87)', '#d0d046', 'orange', 'purple', 'pink'];
    let charCode = this.user.lastName.charCodeAt(0);
    let colorIndex = charCode % colors.length;
    this.user.color = colors[colorIndex];
  }

  // CHECK FORM OF EDITED CONTACT
  checkEditedForm() {
    let { firstName, lastName, email, phone } = this.userForm.value;

    let checkInputs = (value: string): boolean => /^[A-Za-z0-9+-]+$/.test(value);
    let checkMail = (value: string): boolean => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    let checkNumber = (value: string): boolean => /^[0-9+/+]+$/.test(value);

    let isFirstNameValid = checkInputs(firstName.replace(/\s/g, ''));
    let isLastNameValid = checkInputs(lastName.replace(/\s/g, ''));
    let isEmailValid = checkMail(email.replace(/\s/g, ''));
    let isPhoneValid = checkNumber(phone.replace(/\s/g, ''));

    if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isPhoneValid) {
      this.userEdited = false;
    } else {
      this.userEdited = true;
    }
  }
}