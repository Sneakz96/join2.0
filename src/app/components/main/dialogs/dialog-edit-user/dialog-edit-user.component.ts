import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contact.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})

export class DialogEditUserComponent {

  user: Contact;
  userId: string;
  userEdited = false;
  // 
  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private firestore: AngularFirestore,
  ) { }

  // CLOSE DIALOG
  closeDialog() {
    this.dialogRef.close();
  }

  // SAVE EDITED USER TO DB
  save() {
    this.checkEditedForm();
    if (this.userEdited) {
      this.setColor();
      this.closeDialog();
      this.firestore
        .collection('allContacts')
        .doc(this.userId)
        .update(this.user.toJSON());
    }
  }

  // CHECK FORM OF EDITED CONTACT
  checkEditedForm() {
    let { firstName, lastName, email, phone } = this.user;
  
    let checkInputs = (value: string): boolean => /^[A-Za-z0-9+-]+$/.test(value);
    let checkMail = (value: string): boolean => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    let checkNumber = (value: string): boolean => /^[0-9+/+]+$/.test(value);
  
    let isFirstNameValid = checkInputs(firstName.replace(/\s/g, ''));
    let isLastNameValid = checkInputs(lastName.replace(/\s/g, ''));
    let isEmailValid = checkMail(email.replace(/\s/g, ''));
    let isPhoneValid = checkNumber(phone.replace(/\s/g, ''));
  
    if (!isFirstNameValid || !isLastNameValid || !isEmailValid || !isPhoneValid) {
      console.log('error');
      console.log(isFirstNameValid, isLastNameValid, isEmailValid, isPhoneValid);
      this.userEdited = false;
    } else {
      this.userEdited = true;
    }
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
}