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
    } else{
      // console.error('error');
    }
  }

  // CHECK FORM OF EDITED CONTACT
  checkEditedForm(){
    let firstName = this.user.firstName.replace(/\s/g, '');
    let lastName = this.user.lastName.replace(/\s/g, '');
    let mail = this.user.email.replace(/\s/g, '');
    let phone = this.user.phone.replace(/\s/g, '');
    let checkInputs = (value: string): boolean => {
      const allowedCharacters = /^[A-Za-z0-9+-]+$/;
      return allowedCharacters.test(value);
    };
    let checkMail = (value: string): boolean => {
      const allowedNumbers = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return allowedNumbers.test(value);
    };
    let checkNumber = (value: string): boolean => {
      const allowedNumbers = /^[0-9+/+]+$/;
      return allowedNumbers.test(value);
    };
    let first = checkInputs(firstName);
    let last = checkInputs(lastName);
    let email = checkMail(mail);
    let number = checkNumber(phone);
    if (!first || !last || !email || !number) {
      console.log('error'); // Output: false
      console.log(first, last, mail, phone); // Output: false
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
        this.user.color = 'red'
        break;
      case 4:
        this.user.color = 'yellow'
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